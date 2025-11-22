import { Itinerary } from "@prisma/client";
import prisma from "../../prisma";
import { getIO } from "../../sockets";


export interface CreateItineraryInput {
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  note?: string;
  }
  
  
  export interface ItineraryListResponse {
  success: boolean;
  data: Itinerary[];
  }
  
  
  export interface ItineraryCreateResponse {
  success: boolean;
  data: Itinerary;
  }

export const itineraryService = {
  async createItinerary(
    tripId: string,
    userId: string,
    data: CreateItineraryInput
  ):Promise<Itinerary> {
    const isAdmin = await prisma.tripUser.findFirst({
      where: {
        tripId,
        userId,
        role: "ADMIN",
      },
    });

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

    getIO().to(tripId).emit("trip:itineraryCreated", itinerary);
    return itinerary;
  },


  async getItineraryById(tripId: string):Promise<Itinerary[]> {
    const itineraries = await prisma.itinerary.findMany({
      where: { tripId },
      orderBy: {
        date: "asc",
      },
    });

    return itineraries
  },
};
