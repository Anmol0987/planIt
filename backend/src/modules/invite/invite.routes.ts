import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import {
  AcceptInvite,
  CreateInvites,
  getTripInvites,
} from "./invite.controller";

const router = Router();

/**
 * All invite routes are protected.
 */
router.use(authMiddleware);

/**
 * @route POST /invite/accept
 * @desc Accept an invitation using token
 * @access Private
 */
router.post("/accept", (req, res, next) => {
  AcceptInvite(req, res).catch(next);
});

/**
 * @route POST /invite/:tripId
 * @desc Create an invite for the specified trip
 * @access Private
 */
router.post("/:tripId", (req, res, next) => {
  CreateInvites(req, res).catch(next);
});

/**
 * @route GET /invite/:tripId
 * @desc Get all invites for the specified trip
 * @access Private
 */
router.get("/:tripId", (req, res, next) => {
  getTripInvites(req, res).catch(next);
});

export default router;
