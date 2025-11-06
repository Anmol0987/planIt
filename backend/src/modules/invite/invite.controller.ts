import { Request, Response } from "express";
import { inviteService } from "./invite.service";

export const CreateInvites =async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { email } = req.body;
    const { tripId } = req.params;

    console.log(userId,"userId")
    console.log(email,"email")
    console.log(tripId,"trip")



    if (userId) {
      const invite = await inviteService.createInvite(userId,tripId, email );
      res.status(201).json({ success: true, invite });
    }
  } catch (error: any) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to create invite.",
    });
  }
};
export const AcceptInvite = async (req: Request, res: Response) => {
  try {
    console.log (" thisssss")
    const userId = req.user?.id;
    const { token } = req.body;
    console.log(token)
    if (userId) {
      const result = await inviteService.AcceptInvite(userId, token);
      res.status(201).json({ success: true, result });
    }
  } catch (error: any) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to Accept invite.",
    });
  }
};

export const getTripInvites = async (req: Request, res: Response) => {
   try{
    const userId = req.user?.id
    const {tripId} = req.params
    if (userId) {
    const invites = await inviteService.getTripInvites(userId,tripId)
    res.status(201).json({ success: true, invites });
    }
    }
    catch(error:any){
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Failed to get invites.",
          });
    }

};
