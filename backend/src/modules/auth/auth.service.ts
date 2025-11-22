import prisma from "../../prisma";
import { comparePassword, hashPassword } from "../../utils/hash";
import { signAccessToken, signRefreshToken } from "../../utils/jwt";
import { User } from "@prisma/client";

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    //checks in DB is user already exists with email
    const exist = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });
    if (exist) throw new Error("User already exists");

    //hashes password then store in DB
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        name,
      },
    });
    return user;
  } catch (e) {
    console.error("Error in registerUser:", e);

    throw new Error(
      "An error occurred while registering the user. Please try again later."
    );
  }
};

export const loginUser = async (
  password: string,
  email: string
): Promise<{ user: User; accessToken: string }> => {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email:normalizedEmail },
    });
    if (!user) throw new Error("Invalid Credentials");

    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) throw new Error("Invalid credentials");

    const accessToken = signAccessToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });
    // const refreshToken = signRefreshToken({ userId: user.id,email:user.email,name:user.name });

    // await prisma.refreshToken.create({
    //   data: {
    //     userId: user.id,
    //     token: refreshToken,
    //     expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), //30 days expiery,
    //   },
    // });
    return { user, accessToken };
  } catch (e) {
    console.error("Error in loginUser:", e as Error);

    throw new Error(
      "An error occurred while Logging the user. Please try again later."
    );
  }
};
