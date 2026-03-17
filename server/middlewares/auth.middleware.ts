import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.util";

export interface AuthUser {
  id: string;
  tokenVersion: number;
}

/**
 * Middleware that verifies JWT and attaches user to request.
 * Use on routes that require authentication.
 */
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.get("Authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : undefined;

    if (!token) {
      res.status(401).json({ error: "Authorization token required" });
      return;
    }

    const decoded = verifyAccessToken(token) as {
      userId: string;
      tokenVersion: number;
    };

    (req as Request & { user: AuthUser }).user = {
      id: decoded.userId,
      tokenVersion: decoded.tokenVersion,
    };

    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
