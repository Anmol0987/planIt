import { Request, Response } from "express";
import { itinerarySchema } from "./itinerary.schema";
import z, { success } from "zod";
import { itineraryService } from "./itinerary.service";
import prisma from "../../prisma";

export const createItinerary = async (req: Request, res: Response) => {
  try {
    console.log("in createItinerary ")
    const tripId = req.params.tripId;
    const userId = req.user!.id;

    console.log("tripId",tripId)
    console.log("userId",userId)
    console.log("before parsing=========",req.body)
    const validated = itinerarySchema.parse(req.body);
    console.log("valoidate parsing=========",validated)

    const result = await itineraryService.createItinerary(
      req.params.tripId,
      req.user!.id,
      validated
    );
    console.log("======+++++",result)
    res.status(201).json({ success: true, data: result });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: error.message });
    }
    return res.status(500).json({ message: "Failed to create itinerary" });
  }
};

export const getItineraryByTripId = async (req: Request, res: Response) => {
try{
  const tripId = req.params.tripId;
  const userId = req.user!.id;
  const isMember = await prisma.tripUser.findFirst({
    where: { tripId, userId },
  });
  
  if (!isMember) {
    return res
    .status(403)
    .json({ success: false, message: "Not authorized" });
  }
  const result = await itineraryService.getItineraryById(tripId);
  res.status(200).json({ success: true, data: result });
}catch{
  res.status(500).json({success:false,message:"internal error"})
}
};
