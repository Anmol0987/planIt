import { Request, Response } from "express";
import { inviteService } from "./invite.service";

export const CreateInvites = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { email } = req.body;
    const { tripId } = req.params;

    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!tripId || !email)
      return res
        .status(400)
        .json({ success: false, message: "tripId and email required" });

    const invite = await inviteService.createInvite({ userId, tripId, email });
    return res.status(201).json({ success: true, invite });
  } catch (error: any) {
    console.error("CreateInvite error:", error?.message || error);
    return res.status(400).json({
      success: false,
      message: error?.message || "Failed to create invite.",
    });
  }
};
export const AcceptInvite = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { token } = req.body;

    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!token)
      return res
        .status(400)
        .json({ success: false, message: "Missing invite token" });

    const result = await inviteService.AcceptInvite({ userId, token });
    return res.status(201).json({ success: true, result });
  } catch (error: any) {
    console.error("AcceptInvite error:", error?.message || error);
    return res.status(400).json({
      success: false,
      message: error?.message || "Failed to accept invite.",
    });
  }
};

export const getTripInvites = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { tripId } = req.params;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!tripId)
      return res
        .status(400)
        .json({ success: false, message: "tripId required" });
    const invites = await inviteService.getTripInvites(userId, tripId);
    return res.status(201).json({ success: true, invites });
  } catch (error: any) {
    console.error("getTripInvites error:", error?.message || error);
    const status = error?.message?.includes("admin") ? 403 : 400;
    return res.status(status).json({
      success: false,
      message: error?.message || "Failed to fetch invites.",
    });
  }
};
