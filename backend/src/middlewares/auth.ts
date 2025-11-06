import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import prisma from "../prisma";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
      };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
      console.log(token,"111111")

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided." });
    }

    const decode = jwt.verify(token, env.JWT_ACCESS_SECRET) as jwt.JwtPayload;
    console.log(decode,"decode")
    const user = await prisma.user.findUnique({
      where: {
        id: decode.userId,
      },
      select: { id: true, email: true, name: true },
    });
    console.log(user,"user")
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found." });
    }
    req.user = user;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Token expired." });
    }

    return res.status(401).json({ success: false, message: "Invalid token." });
  }
};
