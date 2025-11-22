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

export const createTrip = async (req: Request, res: Response) => {
  try {
    const data = createTripSchema.parse(req.body);
    const userId = req.user?.id;
    if (!userId)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });

    const trip = await CreateTrip(userId, data);

    return res.status(201).json({ success: true, data: trip });
  } catch (err: any) {
    return res
      .status(400)
      .json({ success: false, message: err.message || "Bad Request" });
  }
};

export const getTrips = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });

    const trip = await getUsersTrip(userId);
    return res.status(201).json({ success: true, data: trip });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};

export const getTripsById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const tripId = req.params.id;
    if (!userId)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    if (!tripId)
      return res
        .status(400)
        .json({ success: false, message: "Trip id required" });

    const trip = await getTripById(tripId, userId);
    return res.status(201).json({ success: true, data: trip });
  } catch (err: any) {
    return res
      .status(400)
      .json({ success: false, message: err.message || "Not found" });
  }
};

export const deleteTripById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const tripId = req.params.id;

    if (!userId)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    if (!tripId)
      return res
        .status(400)
        .json({ success: false, message: "Trip id required" });
    const deleted = await deleteById(tripId, userId);
    return res.status(200).json({ success: true, data: deleted });
  } catch (err: any) {
    const message = err?.message || "Internal Server Error";
    if (message.includes("Not authorized"))
      return res.status(403).json({ success: false, message });
    if (message.includes("not found"))
      return res.status(404).json({ success: false, message });
    return res.status(500).json({ success: false, message });
  }
};

export const updateTripById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const tripId = req.params.id;
    const data = req.body;
    if (!userId)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    if (!tripId)
      return res
        .status(400)
        .json({ success: false, message: "Trip id required" });

    const updatedTrip = await updateById(tripId, userId, data);
    return res.status(200).json({ success: true, data: updatedTrip });
  } catch (err: any) {
    const message = err?.message || "Internal Server Error";
    if (message.includes("Not authorized"))
      return res.status(403).json({ success: false, message });
    if (message.includes("not found"))
      return res.status(404).json({ success: false, message });
    return res.status(500).json({ success: false, message });
  }
};

//polls

export const createPoll = async (req: Request, res: Response) => {
  try {
    const data = CreatePollSchema.parse(req.body);
    const tripId = req.params.id;
    const userId = req.user?.id;

    if (!userId)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    if (!tripId)
      return res
        .status(400)
        .json({ success: false, message: "Trip id required" });

    const poll = await createPollService(userId!, tripId, data);
    return res.status(200).json({ success: true, data: poll });
  } catch (err: any) {
    const message = err?.message || "Internal Server Error";
    if (message.includes("Only admin"))
      return res.status(403).json({ success: false, message });
    return res.status(400).json({ success: false, message });
  }
};

export const getPoll = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const tripId = req.params.id;

    if (!userId)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    if (!tripId)
      return res
        .status(400)
        .json({ success: false, message: "Trip id required" });

    const poll = await getPollService(tripId, userId);
    return res.status(200).json({ success: true, data: poll });
  } catch (err: any) {
    const message = err?.message || "Internal Server Error";
    if (message.includes("Access denied"))
      return res.status(403).json({ success: false, message });
    return res.status(500).json({ success: false, message });
  }
};
