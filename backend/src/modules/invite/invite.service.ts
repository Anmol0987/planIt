import { randomBytes } from "crypto";
import prisma from "../../prisma";
import { Role } from "@prisma/client";

export const inviteService = {
  async createInvite(userId: string, tripId: string, email: string) {
    const normalizedTripId = tripId.trim();
    const normalizedUserId = userId.trim();

    console.log("Checking admin:", {
      normalizedTripId,
      normalizedUserId,
      email,
    });

    const members = await prisma.tripUser.findMany({
      where: { tripId: normalizedTripId },
      select: { userId: true, role: true },
    });
    console.log("Trip members in DB:", members);

    console.log(typeof tripId, typeof userId);
    const isAdmin = await prisma.tripUser.findMany({
      where: {
        userId: normalizedUserId,
        tripId: normalizedTripId,
        role: Role.ADMIN,
      },
    });
    console.log(isAdmin, "isadmin");
    if (!isAdmin) throw { status: 403, message: "only admin can invite" };

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000); //48 hrs

    const invite = await prisma.invite.create({
      data: {
        email,
        token,
        expiresAt,
        tripId,
      },
    });

    //email by nodemailer later
    return invite;
  },

  async AcceptInvite(userId: string, token: string) {
    const invite = await prisma.invite.findUnique({
      where: {
        token,
      },
    });
    if (!invite || invite.expiresAt < new Date()) {
      throw { status: 400, message: "Invalid or expired invite." };
    }

    const existing = await prisma.tripUser.findFirst({
      where: { userId, tripId: invite.tripId },
    });
    if (existing) {
      throw { status: 400, message: "you are already part of this trip" };
    }

    await prisma.tripUser.create({
      data: {
        tripId: invite.tripId,
        userId,
        role: Role.MEMBER,
      },
    });

    await prisma.invite.update({
      where: {
        id: invite.id,
      },
      data: {
        accepted: true,
      },
    });
    return "Joined trip successfully.";
  },

  async getTripInvites(userId: string, tripId: string) {
    const admin = await prisma.tripUser.findFirst({
      where: {
        userId,
        tripId,
        role: "ADMIN",
      },
    });
    console.log(admin,"admin")
    if (!admin) {
      throw { status: 400, message: "Only admin can view invites" };
    }

    const invites = prisma.invite.findMany({
      where: {
        tripId,
        accepted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(invites)
    return invites;
  },
};
