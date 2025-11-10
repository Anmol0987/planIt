import { signInSchema, signUpSchema } from "./auth.schema";
import { Request, Response } from "express";
import { loginUser, registerUser } from "./auth.service";
import z from "zod";
import { env } from "../../config/env";
import prisma from "../../prisma";
import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Handles user registration
 * @route POST /signup
 */
export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = signUpSchema.parse(req.body);
    const user = await registerUser(data.name, data.email, data.password);
    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
      },
      message: "User registration successful.",
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, errors: error.issues });
      return;
    }
    // Hide implementation details from client
    console.error("[SignUp Error]", error);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

/**
 * Handles user login
 * @route POST /signin
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = signInSchema.parse(req.body);

    const { accessToken, refreshToken, user } = await loginUser(
      data.password,
      data.email
    );
    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, errors: error.issues });
      return;
    }
    console.error("[Login Error]", error);
    res.status(401).json({ success: false, message: "Invalid credentials." });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const payload = jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });
    if (!user) return res.status(401).json({ message: "Invalid user" });

    // Issue new access token
    const newAccessToken = jwt.sign(
      { userId: user.id, email: user.email },
      env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    return res.json({ accessToken: newAccessToken });
  } catch {
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
};
