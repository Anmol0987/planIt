import { randomBytes } from "crypto";
import prisma from "../../prisma";
import { Role } from "@prisma/client";
import { Invite } from "@prisma/client";

export const inviteService = {
  async createInvite(
    userId: string,
    tripId: string,
    email: string
  ): Promise<Invite> {
    const normalizedTripId = tripId.trim();
    const normalizedUserId = userId.trim();

    const isAdmin = await prisma.tripUser.findMany({
      where: {
        userId: normalizedUserId,
        tripId: normalizedTripId,
        role: Role.ADMIN,
      },
    });
    if (!isAdmin)
      throw new Error("Only admin can invite new members to the trip");

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

  async AcceptInvite(userId: string, token: string): Promise<string> {
    const invite = await prisma.invite.findUnique({
      where: {
        token,
      },
    });
    if (!invite || invite.expiresAt < new Date()) {
      throw new Error("Invalid or expired invite.");
    }

    const existing = await prisma.tripUser.findFirst({
      where: { userId, tripId: invite.tripId },
    });
    if (existing) {
      throw new Error("You are already part of this trip");
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

  async getTripInvites(userId: string, tripId: string): Promise<Invite[]> {
    try {
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  },
};
