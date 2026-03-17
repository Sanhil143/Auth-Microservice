import { Request } from "express";

/**
 * Extracts session metadata from an HTTP request.
 * Reusable across auth, session, and audit flows.
 * @param req - Express request object
 * @returns Object containing ip, userAgent, and deviceInfo
 */
export function getRequestMeta(req: Request): {
  ip?: string;
  userAgent?: string;
  deviceInfo?: string;
} {
  const ip = req.ip || req.socket?.remoteAddress;
  const userAgent = req.get("user-agent") || undefined;
  const deviceInfo = userAgent?.slice(0, 150); // Truncate for storage

  return { ip, userAgent, deviceInfo };
}
