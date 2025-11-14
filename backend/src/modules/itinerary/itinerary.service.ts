import prisma from "../../prisma";
import { getIO } from "../../sockets";

export const itineraryService = {
  async createItinerary(
    tripId: string,
    userId: string,
    data: {
      date: string;
      startTime: string;
      endTime: string;
      title: string;
      note?: string;
    }
  ) {
    console.log("data",data)
    const isAdmin = await prisma.tripUser.findFirst({
      where: {
        tripId,
        userId,
        role: "ADMIN",
      },
    });
    console.log("isadmin",isAdmin)

    if (!isAdmin) throw new Error("Only admin can add Itenary");

    const formattedDate = new Date(data.date);
    if (isNaN(formattedDate.getTime())) {
      throw new Error("Invalid date format");
    }

    const itinerary = await prisma.itinerary.create({
      data: {
        tripId,
        date: formattedDate,
        startTime: data.startTime,
        endTime: data.endTime,
        title: data.title,
        note: data.note || null,
      },
    });
    console.log("askfbadkfbkas",itinerary)

    getIO().to(tripId).emit("trip:itineraryCreated", itinerary);
    return itinerary;
  },
  async getItineraryById(tripId: string) {
    const itineraryData = await prisma.itinerary.findMany({
      where: { tripId },
      orderBy: {
        date: "asc",
      },
    });

    return itineraryData
  },
};
