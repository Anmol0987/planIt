import { Router } from "express";
import { createPoll, createTrip, deleteTripById, getPoll, getTrips, getTripsById, updateTripById } from "./trip.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();
router.use(authMiddleware);

router.get("/", getTrips);
router.post("/", createTrip);
router.get("/:id", getTripsById);
router.delete("/:id",deleteTripById)
router.put("/:id",updateTripById)
router.post("/:id/polls",createPoll)
router.get("/:id/polls",getPoll)


export default router;
