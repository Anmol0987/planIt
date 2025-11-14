import { Router } from "express";
import { createItinerary, getItineraryByTripId } from "./itinerary.controller";
import { authMiddleware } from "../../middlewares/auth";


const router = Router()

router.use(authMiddleware)

router.post('/create/:tripId',createItinerary)
router.get('/:tripId',getItineraryByTripId)

export default router