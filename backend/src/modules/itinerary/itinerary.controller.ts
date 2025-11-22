import { Request, Response } from "express";
import { itinerarySchema } from "./itinerary.schema";
import z, { success } from "zod";
import { itineraryService } from "./itinerary.service";
import prisma from "../../prisma";

export const createItinerary = async (req: Request, res: Response) => {
  try {
    const tripId = req.params.tripId;
    const userId = req.user!.id;
    if (!tripId)
      return res
        .status(400)
        .json({ success: false, message: "Missing tripId" });
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const validated = itinerarySchema.parse(req.body);

    const result = await itineraryService.createItinerary(
      tripId,
      userId,
      validated
    );
    return res.status(201).json({ success: true, data: result });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: error.message });
    }
    return res.status(500).json({ message: "Failed to create itinerary" });
  }
};

export const getItineraryByTripId = async (req: Request, res: Response) => {
  try {
    const tripId = req.params.tripId;
    const userId = req.user!.id;

    if (!tripId)
      return res
        .status(400)
        .json({ success: false, message: "Missing tripId" });
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const isMember = await prisma.tripUser.findFirst({
      where: { tripId, userId },
      select: { id: true },
    });

    if (!isMember) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }
    const result = await itineraryService.getItineraryById(tripId);
    return res.status(200).json({ success: true, data: result });
  } catch {
    return res.status(500).json({ success: false, message: "internal error" });
  }
};
