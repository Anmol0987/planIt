import { Router } from "express";
import { createTrip, deleteTripById, getTrips, getTripsById, updateTripById } from "./trip.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();
router.use(authMiddleware);

router.get("/", getTrips);
router.post("/", createTrip);
router.get("/:id", getTripsById);
router.delete("/:id",deleteTripById)
router.put("/:id",updateTripById)


export default router;
