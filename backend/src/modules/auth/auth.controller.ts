import { signInSchema, signUpSchema } from "./auth.schema";
import { Request, Response } from "express";
import { loginUser, registerUser } from "./auth.service";
import z from "zod";


export const signUp = async (req: Request, res: Response) => {
  try {
    const data = signUpSchema.parse(req.body);
    const user = await registerUser(data.name, data.email, data.password);
    res.status(201).json({
      success: true,
      data: { id: user.id, email: user.email },
      message: "User registration successful."
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, errors: err.issues });
    }
    console.error("SignUp Error:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const data = signInSchema.parse(req.body);

    const { accessToken, refreshToken, user } = await loginUser(
      data.password,
      data.email
    );
    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", // secure in production
      maxAge: 7 * 24 * 60 * 60 * 1000 // example: Expires in 7 days
    });
    res.json({
      success: true,
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, errors: err.issues });
    }
    console.error("Login Error:", err);
    res.status(401).json({ success: false, message: "Invalid credentials." });
  }
};
