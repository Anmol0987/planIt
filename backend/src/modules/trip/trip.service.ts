import { Role } from "@prisma/client";
import prisma from "../../prisma";

export const CreateTrip = async (userId: string, data: any) => {
  const trip = await prisma.trip.create({
    data: {
      name: data.name,
      destination: data.destination,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      createdById: userId,
      members: {
        create: { userId, role: "ADMIN" },
      },
    },
    include: {
      members: { include: { user: true } },
    },
  });
  return trip;
};

export const getUsersTrip = async (userId: string) => {
  return await prisma.trip.findMany({
    where: { members: { some: { userId } } },
    include: { members: { include: { user: true } } },
  });
};

export const getTripById = async (tripId: string, userId: string) => {
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, members: { some: { userId } } },
    include: { members: { include: { user: true } }, invites: true },
  });

  if (!trip) throw new Error("Trip not found");
  return trip;
};

export const deleteById = async (tripId: string, userId: string) => {
  return await prisma.$transaction(async (tx) => {
    const trip = await tx.trip.findUnique({
      where: { id: tripId },
      include: { members: true },
    });
    if (!trip) throw new Error("Trip not found");
    const isAdmin = trip.members.some(
      (m) => m.userId === userId && m.role === Role.ADMIN
    );

    if (!isAdmin) throw new Error("Not authorized to delete this trip");

    const deleted = await tx.trip.delete({ where: { id: tripId } });
    return deleted;
  });
};

export const updateById = async (tripId: string, userId: string, data: any) => {
  const member = await prisma.tripUser.findFirst({
    where: { tripId, userId },
  });
  if (!member) throw new Error("Trip not found or access denied");
if (member.role !== Role.ADMIN) throw new Error("Not authorized to update trip");
  const updated = await prisma.trip.update({
    where: { id: tripId },
    data: {
      name: data.name,
      destination: data.destination,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    },
  });
  return updated;
};

export const createPollService = async (
  userId: string,
  tripId: string,
  data: any
) => {
    const admin = await prisma.tripUser.findFirst({
      where: { userId, tripId, role: Role.ADMIN },
      });
      if (!admin) throw new Error("Only admin can create a poll for this trip");
    const poll = await prisma.poll.create({
      data: {
        createdBy: userId!,
        tripId,
        question: data.question,
        type: data.type,
        options: {
          create: data.options.map((text: string) => ({ text })),
        },
        isClosed: false,
      },
      include: { options: true },
    });
    return poll;
  
};

export const getPollService = async (tripId: string,userId:string) => {
  const isMember = await prisma.tripUser.findFirst({ where: { tripId, userId } });
  if (!isMember) throw new Error("Access denied");
    const polls = await prisma.poll.findMany({
      where: { tripId },
      include: { options: true, votes: true },
    });
    return polls;
  
};
