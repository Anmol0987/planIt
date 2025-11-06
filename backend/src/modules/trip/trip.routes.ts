import { Router } from "express";
import { createTrip, getTrips, getTripsById } from "./trip.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();
router.use(authMiddleware);

router.get("/", getTrips);
router.post("/", createTrip);
router.get("/:id", getTripsById);

export default router;
