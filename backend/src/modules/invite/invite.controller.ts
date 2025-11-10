import { Request, Response } from "express";
import { inviteService } from "./invite.service";

export const CreateInvites =async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { email } = req.body;
    const { tripId } = req.params;

    if (userId) {
      const invite = await inviteService.createInvite(userId,tripId, email );
      res.status(201).json({ success: true, invite });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message || "Failed to create invite.",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "An unexpected error occurred.",
      });
    }
  }
};
export const AcceptInvite = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { token } = req.body;
    if (userId) {
      const result = await inviteService.AcceptInvite(userId, token);
      res.status(201).json({ success: true, result });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message || "Failed to Accept invite.",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "An unexpected error occurred.",
      });
    }
  }
};

export const getTripInvites = async (req: Request, res: Response): Promise<void> => {
   try{
    const userId = req.user?.id
    const {tripId} = req.params
    if (userId) {
    const invites = await inviteService.getTripInvites(userId,tripId)
    res.status(201).json({ success: true, invites });
    }
    } catch(error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message || "Failed to get invites.",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "An unexpected error occurred.",
      });
    }
  }
};
