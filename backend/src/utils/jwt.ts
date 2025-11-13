import jwt from "jsonwebtoken";
import { env } from "../config/env";

/**
 * Description
 * @param {object} payload
 * @returns {any}
 */
export const signAccessToken = (payload: object): string => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET as jwt.Secret, {
    expiresIn: env.ACCESS_TOKEN_EXP as jwt.SignOptions["expiresIn"],
  });
};


export const signRefreshToken = (payload: { userId: string; email: string }) => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
};


/**
 * Description
 * @param {string} token
 * @returns {any}
 */
export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET as jwt.Secret);
};
/**
 * Description
 * @param {string} token
 * @returns {any}
 */
export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET as jwt.Secret);
};