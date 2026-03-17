import { Types } from "mongoose";
import { Request } from "express";
import { session } from "../../models/session.model";
import { authToken } from "../../models/authToken.model";
import { getRequestMeta } from "../../utils/requestMeta.util";
import { ISession } from "../../interfaces/session.interface";
import ms from "ms";
import l from "../../utils/logger.util";

class SessionService {
  /**
   * Creates a session linked to an auth token. Call on login.
   * @param userId - User ID
   * @param authTokenId - AuthToken document ID
   * @param req - Express request for metadata
   * @param expiresIn - Expiry duration (e.g. "30d")
   */
  async create(
    userId: Types.ObjectId,
    authTokenId: Types.ObjectId,
    req: Request,
    expiresIn: string = "30d"
  ): Promise<ISession> {
    l.info(`${this.constructor.name}.create()`);
    const meta = getRequestMeta(req);
    const expiresMs = ms(expiresIn as ms.StringValue);

    const sess = await session.create({
      userId,
      authTokenId,
      ...meta,
      lastActivityAt: new Date(),
      expiresAt: new Date(Date.now() + expiresMs),
      isActive: true,
    });

    return sess;
  }

  /**
   * Updates session to point to new auth token. Call on token refresh.
   * @param oldAuthTokenId - Previous auth token ID
   * @param newAuthTokenId - New auth token ID
   */
  async updateAuthToken(
    oldAuthTokenId: Types.ObjectId,
    newAuthTokenId: Types.ObjectId
  ): Promise<void> {
    l.info(`${this.constructor.name}.updateAuthToken()`);
    await session.updateOne(
      { authTokenId: oldAuthTokenId },
      {
        $set: {
          authTokenId: newAuthTokenId,
          lastActivityAt: new Date(),
        },
      }
    );
  }

  /**
   * Lists active sessions for a user (isActive true and authToken not revoked).
   * @param userId - User ID
   */
  async listByUserId(userId: string) {
    l.info(`${this.constructor.name}.listByUserId()`);
    const sessions = await session
      .find({ userId: new Types.ObjectId(userId), isActive: true })
      .populate("authTokenId", "tokenId revoked expiresAt")
      .sort({ lastActivityAt: -1 })
      .lean();

    return sessions.filter((s: any) => !s.authTokenId?.revoked);
  }

  /**
   * Revokes a session by revoking its linked auth token.
   * @param sessionId - Session document ID
   * @param userId - User ID (ensures user owns the session)
   */
  async revoke(
    sessionId: string,
    userId: string
  ): Promise<{ status: boolean; message: string }> {
    l.info(`${this.constructor.name}.revoke()`);
    const sess = await session.findOne({
      _id: new Types.ObjectId(sessionId),
      userId: new Types.ObjectId(userId),
    });

    if (!sess) throw new Error("Session not found");

    const tokenDoc = await authToken.findById(sess.authTokenId);
    if (tokenDoc) {
      tokenDoc.revoked = true;
      await tokenDoc.save();
    }

    sess.isActive = false;
    await sess.save();

    return { status: true, message: "Session revoked successfully" };
  }

  /**
   * Terminates all sessions for a user. Revokes all auth tokens and sets isActive false.
   * @param userId - User ID
   */
  async terminateAll(
    userId: string
  ): Promise<{ status: boolean; message: string }> {
    l.info(`${this.constructor.name}.terminateAll()`);
    const activeSessions = await session.find({
      userId: new Types.ObjectId(userId),
      isActive: true,
    });
    const authTokenIds = activeSessions.map((s) => s.authTokenId);

    await authToken.updateMany(
      { _id: { $in: authTokenIds } },
      { $set: { revoked: true } }
    );
    await session.updateMany(
      { userId: new Types.ObjectId(userId), isActive: true },
      { $set: { isActive: false } }
    );

    return { status: true, message: "All sessions terminated successfully" };
  }

  /**
   * Updates last activity timestamp. Call on protected requests if needed.
   * @param sessionId - Session document ID
   */
  async touch(sessionId: string): Promise<void> {
    await session.findByIdAndUpdate(sessionId, {
      lastActivityAt: new Date(),
    });
  }
}

export default new SessionService();
