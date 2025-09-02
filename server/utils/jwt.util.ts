import jwt, { SignOptions } from "jsonwebtoken";
import ms from "ms";

export function signAccessToken(userId: string, tokenVersion: number) {
  const payload = { userId, tokenVersion };
  const expiresInStr = process.env.JWT_EXPIRES_IN || "15m";
  const expiresInSecond = Math.floor(ms(expiresInStr as ms.StringValue) / 1000);
  const options: SignOptions = {
    expiresIn: expiresInSecond,
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, options);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
