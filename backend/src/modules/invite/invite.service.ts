import { randomBytes } from "crypto";
import prisma from "../../prisma";
import { Role } from "@prisma/client";
import { Invite } from "@prisma/client";
import { getIO } from "../../sockets";

interface CreateInviteInterface {
  userId: string;
  tripId: string;
  email: string;
};

 interface AcceptinviteInterface {
  userId: string;
  token: string;
};
export const inviteService = {
  async createInvite({
    userId,
    tripId,
    email,
  }: CreateInviteInterface): Promise<Invite> {
    const normalizedTripId = tripId.trim();
    const normalizedUserId = userId.trim();

    const isAdmin = await prisma.tripUser.findMany({
      where: {
        userId: normalizedUserId,
        tripId: normalizedTripId,
        role: Role.ADMIN,
      },
    });
    // console.log(isAdmin, "admin");
    if (!isAdmin)
      throw new Error("Only admin can invite new members to the trip");
    const existingInvite = await prisma.invite.findFirst({
      where: {
        email,
        tripId: normalizedTripId,
        accepted: false, // not accepted yet
      },
    });

    if (existingInvite) {
      throw new Error("This email is already invited to this trip.");
    }
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000); //48 hrs

    const invite = await prisma.invite.create({
      data: {
        email,
        token,
        expiresAt,
        tripId: normalizedTripId,
      },
    });
    getIO().to(tripId).emit("trip:inviteCreated", {
      email,
      tripId: normalizedTripId,
      createdAt: invite.createdAt,
    });

    //email by nodemailer later
    return invite;
  },

  async AcceptInvite({userId, token}:AcceptinviteInterface): Promise<string> {
    const invite = await prisma.invite.findUnique({
      where: {
        token,
      },
    });
    if (!invite || invite.expiresAt < new Date()) {
      throw new Error("Invalid or expired invite.");
    }
    if (invite.accepted) {
      throw new Error("Invite already accepted");
    }

    const existing = await prisma.tripUser.findFirst({
      where: { userId, tripId: invite.tripId },
    });
    if (existing) {
      throw new Error("You are already part of this trip");
    }
    //add user to trip
    await prisma.tripUser.create({
      data: {
        tripId: invite.tripId,
        userId,
        role: Role.MEMBER,
      },
    });
    getIO().to(invite.tripId).emit("trip:newMemberAdded", { userId });

    // Mark invite accepted
    await prisma.invite.update({
      where: {
        id: invite.id,
      },
      data: {
        accepted: true,
      },
    });

    return invite.tripId;
  },

  async getTripInvites(userId: string, tripId: string): Promise<Invite[]> {
      const admin = await prisma.tripUser.findFirst({
        where: {
          userId,
          tripId,
          role: Role.ADMIN,
        },
      });

      if (!admin) throw new Error("Only admin can view invites");

      const invites = await prisma.invite.findMany({
        where: {
          tripId,
          accepted: false,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      if (!invites) throw new Error("No invites found");
      return invites;
   
  },
};
