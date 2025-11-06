import { Request, Response } from "express";
import { createTripSchema } from "./trip.schema";
import { CreateTrip, getTripById, getUsersTrip } from "./trip.service";

export const createTrip = async (req: Request, res: Response) => {
  try {
    const data = createTripSchema.parse(req.body);
    const userId = req.user?.id;
    if (userId) {
      const trip = await CreateTrip(userId, data);

      res.status(201).json({ success: true, data: trip });
    } else {
      throw new Error("User Not found");
    }
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getTrips = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (userId) {
      const trip = await getUsersTrip(userId);
      res.status(201).json({ success: true, data: trip });
    } else {
      throw new Error("User Not found");
    }
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getTripsById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const tripId = req.params.id;
    if (userId) {
      const trip = await getTripById(tripId, userId);
      res.status(201).json({ success: true, data: trip });
    } else {
      throw new Error("User Not found");
    }
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};
