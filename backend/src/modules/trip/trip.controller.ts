import { Request, Response } from "express";
import { CreatePollSchema, createTripSchema } from "./trip.schema";
import {
  createPollService,
  CreateTrip,
  deleteById,
  getPollService,
  getTripById,
  getUsersTrip,
  updateById,
} from "./trip.service";
import prisma from "../../prisma";
import { Role } from "@prisma/client";

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

export const deleteTripById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const tripId = req.params.id;

    if (!userId || !tripId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: { members: true },
    });
    if (!trip) {
      return res
        .status(404)
        .json({ success: false, message: "Trip not found" });
    }

    const isAdmin = trip.members.some(
      (m) => m.userId === userId && m.role === "ADMIN"
    );

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this trip",
      });
    }
    const deleted = await deleteById(tripId);
    res.status(200).json({ success: true, data: deleted });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateTripById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const tripId = req.params.id;
    const data = req.body;
    console.log("data", data);
    if (!userId || !tripId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: { members: true },
    });
    if (!trip)
      return res.status(403).json({ success: false, message: "No trip found" });

    const isAdmin = trip.members.some(
      (m) => m.userId === userId && m.role === "ADMIN"
    );
    if (!isAdmin)
      return res
        .status(404)
        .json({ success: false, message: "Not authorized to update trip" });

    const updatedTrip = await updateById(tripId, data);
    console.log("updated values", updatedTrip);
    res.status(200).json({ success: true, data: updatedTrip });
  } catch (e) {}
};

//polls

export const createPoll = async (req: Request, res: Response) => {
  try {
    const data = CreatePollSchema.parse(req.body);
    const tripId = req.params.id;
    const userId = req.user?.id;

    if (!data || !tripId || !userId) {
      return res.status(400).json({ success: false, message: "Not Valid" });
    }

    const isAdmin = await prisma.tripUser.findMany({
      where: { userId, tripId, role: Role.ADMIN },
    });
    if (!isAdmin)
      throw new Error("Only admin can create new poll to the trip");
    const poll = await createPollService(userId!, tripId, data);
    console.log("poll", poll);
    res.status(200).json({ success: true, data: poll });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getPoll = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const tripId = req.params.id;

    if (!tripId || !userId)
      res.status(400).json({ success: false, message: "Not Valid" });

    const poll = await getPollService(tripId);
    res.status(200).json({ success: true, data: poll });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};
