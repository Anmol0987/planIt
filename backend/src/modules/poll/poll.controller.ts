import { Request, Response } from "express";
import {
    closePollByIdService,
  deletePollByIdService,
  getPollDetailsByIdService,
  voteOnPollService,
} from "./poll.service";
import { VoteSchema } from "./poll.schema";
import prisma from "../../prisma";
import { Role } from "@prisma/client";
import z, { success } from "zod";

export const getPollDetailsById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.id;
    const pollId = req.params.id;

    if (!userId || !pollId)
      return res.status(400).json({ success: false, message: "Not Valid" });

    const poll = await getPollDetailsByIdService(pollId);
    if (!poll) {
      return res.status(404).json({ success: false, message: "Poll not found" });
    }
    return res.status(200).json({ success: true, data: poll });
  } catch (err: any) {
   return res.status(400).json({ success: false, message: err.message });
  }
};

export const voteOnPoll = async (req: Request, res: Response) : Promise<Response>=> {
  try {
    const pollId = req.params.id;
    const userId = req.user?.id;
    if (!pollId || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid poll or user." });
    }
    const data = VoteSchema.parse(req.body);
    const response = await voteOnPollService({
      pollId,
      userId,
      optionIds: data.optionIds,
    });

   return res.status(200).json({ success: true, data: response });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
    return res.status(400).json({ success: false, message: err.message });
    }
    return res.status(400).json({ success: false, message: err.message });
    }
};

export const deletePollById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.id;
    const pollId = req.params.id;

    if (!userId || !pollId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid poll or user" });
    }
    const poll = await prisma.poll.findUnique({
        where: { id: pollId },
      });
      if (!poll) {
        return res
          .status(404)
          .json({ success: false, message: "Poll not found" });
      }

    const membership = await prisma.tripUser.findFirst({
      where: {
        tripId: poll.tripId,
        userId,
        role: Role.ADMIN,
      },
    });

    if (!membership) {
      return res
        .status(403)
        .json({ success: false, message: "Only admin can delete poll" });
    }
    const response = await deletePollByIdService(pollId);
    return res.status(200).json({success:true,data:response})
  } catch (err: any) {
   return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const closePollById=async(req:Request,res:Response): Promise<Response>=>{

    try {
        const userId = req.user?.id;
        const pollId = req.params.id;
        
        if (!userId || !pollId) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid poll or user." });
        }
    
        const poll = await prisma.poll.findUnique({
          where: { id: pollId },
        });
    
        if (!poll) {
          return res.status(404).json({
            success: false,
            message: "Poll not found",
          });
        }
    
        const isAdmin = await prisma.tripUser.findFirst({
          where: {
            tripId: poll.tripId,
            userId,
            role: Role.ADMIN,
          },
        });
    
        if (!isAdmin) {
          return res.status(403).json({
            success: false,
            message: "Only admin can close poll",
          });
        }
        const closedPoll = await closePollByIdService(pollId);
    
        return res.status(200).json({ success: true, data: closedPoll });
      } catch (err: any) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
    };
