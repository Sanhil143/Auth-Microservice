import jwt, { SignOptions } from "jsonwebtoken";
import ms from "ms";

/**
 * Generates a new access token using the given user ID and token version.
 * The resulting token is signed with the JWT_SECRET environment variable.
 * The token expires after the duration specified by the JWT_EXPIRES_IN
 * environment variable, or 15 minutes if that variable is not set.
 * @param {string} userId - Unique identifier of the user.
 * @param {number} tokenVersion - Version of the user's token.
 * @returns {string} New access token.
 */
export function signAccessToken(userId: string, tokenVersion: number) {
  const payload = { userId, tokenVersion };
  const expiresInStr = process.env.JWT_EXPIRES_IN || "15m";
  const expiresInSecond = Math.floor(ms(expiresInStr as ms.StringValue) / 1000);
  const options: SignOptions = {
    expiresIn: expiresInSecond,
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, options);
}

/**
 * Verifies the given access token using the secret in the environment.
 * @param token - The access token to verify.
 * @returns The decoded payload if the token is valid, otherwise throws an error.
 */
export function verifyAccessToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
