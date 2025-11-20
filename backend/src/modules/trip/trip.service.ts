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
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
    include: { members: { include: { user: true } }, invites: true },
  });

  if (!trip) throw new Error("Trip not found");

  const isMember = trip.members.some((m) => m.userId === userId);
  if (!isMember) throw new Error("Access denied");

  return trip;
};

export const deleteById = async (tripId: string) => {
  return await prisma.trip.delete({
    where: { id: tripId },
  });
};

export const updateById = async (tripId: string, data: any) => {
  try {
    const updated = await prisma.trip.update({
      where: { id: tripId },
      data: {
        name: data.name,
        destination: data.destination,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      },
    });
    console.log("inside service", updated);
    return updated;
  } catch (e: any) {
    console.log("error", e.message);
  }
};

export const createPollService = async (
  userId: string,
  tripId: string,
  data: any
) => {
  try {
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
  } catch (e: any) {
    console.log("error", e.message);
  }
};

export const getPollService = async (tripId: string) => {
  try {
    const polls = await prisma.poll.findMany({
      where: { tripId },
      include: { options: true, votes: true },
    });
    return polls;
  } catch (err) {
    console.error("getPollService error:", err);
    throw err;
  }
};
