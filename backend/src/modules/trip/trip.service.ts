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

export const updateById = async (tripId: string,data:any) => {
  try{const updated= await prisma.trip.update({ where: { id: tripId } ,data:{
    name:data.name,
    destination:data.destination ,
    startDate:  new Date(data.startDate),
    endDate:new Date(data.endDate)
  }});
  console.log("inside service",updated)
  return updated;}
  catch(e:any){
    console.log("error",e.message)
  }
};
