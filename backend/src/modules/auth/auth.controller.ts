import { signInSchema, signUpSchema } from "./auth.schema";
import { Request, Response } from "express";
import { loginUser, registerUser } from "./auth.service";
import z from "zod";

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

    const { accessToken, user } = await loginUser(data.password, data.email);

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30days
    });
    res.status(200).json({ success: true, user });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, errors: error.issues });
      return;
    }
    console.error("[Login Error]", error);
    res.status(401).json({ success: false, message: "Invalid credentials." });
  }
};

// export const refreshAccessToken = async (req: Request, res: Response) => {

//   console.log("inside refresh token ig", req.body);
//   try {
//     const token = req.body.refreshToken;
//     if (!token)
//       return res.status(401).json({ message: "Missing refresh token" });

//     const decoded = verifyRefreshToken(token);
//     if (!decoded)
//       return res.status(401).json({ message: "Invalid refresh token" });
//     const payload = decoded as JwtPayload & { userId: string; email?: string,name:string };

//     const stored = await prisma.refreshToken.findUnique({ where: { token } });
//     if (!stored || stored.revoked || stored.expiresAt < new Date()) {
//       return res
//         .status(401)
//         .json({ message: "Refresh token expired or revoked" });
//     }

//     const newAccessToken = signAccessToken({
//       userId: payload.userId,
//       email: payload.email!,
//       name:payload.name

//     });
//     const newRefreshToken = signRefreshToken({
//       userId: payload.userId,
//       email: payload.email!,
//       name:payload.name
//     });
//     await prisma.refreshToken.update({
//       where: { token },
//       data: { revoked: true },
//     });
//     await prisma.refreshToken.create({
//       data: {
//         userId: payload.userId,
//         token: newRefreshToken,
//         expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
//       },
//     });

//     return res
//       .status(200)
//       .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
//   } catch (err) {
//     console.error("Error refreshing access token:", err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };


export const getMe = (req: Request, res: Response) => {
  try {
  if (!req.user) return res.status(401).json({ success: false, message: "Not authenticated" });
  return res.status(200).json({ success: true, user: req.user });
  } catch (err: any) {
  console.error("getMe error:", err?.message || err);
  return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
  };

  export const logout = async (req: Request, res: Response) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  };
  