import { Types } from "mongoose";
import { authToken } from "../../models/authToken.model";
import { user } from "../../models/user.model";
import { signAccessToken } from "../../utils/jwt.util";
import { v4 as uuidv4 } from "uuid";
import { IRefreshResponse } from "../../interfaces/authToken.interface";
import l from "../../utils/logger.util";
import ms from "ms";

class AuthTokenService {
  /**
   * Refreshes an access token given a valid, non-revoked refresh token.
   * @param refreshTokenId - The ID of the refresh token to use.
   * @returns An object containing a new access token and a new refresh token.
   * @throws Will throw an error if the refresh token is invalid or revoked.
   */
  async refreshToken(refreshTokenId: string): Promise<IRefreshResponse> {
    l.info(`${this.constructor.name}.refreshToken()`);
    // Find valid, non-revoked token
    const tokenDoc = await authToken.findOne({
      tokenId: refreshTokenId,
      revoked: false,
    });

    if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
      throw new Error("Invalid refresh token");
    }

    // Get user
    const userData = await user.findById(tokenDoc.userId);
    if (!userData) throw new Error("User not found");

    // Revoke old refresh token
    tokenDoc.revoked = true;
    await tokenDoc.save();

    const expiresInStr = process.env.REFRESH_TOKEN_EXPIRES_IN || "30d";
    const expiresMs = ms(expiresInStr as ms.StringValue);
    // Create new refresh token
    const newRefreshId = uuidv4();
    await authToken.create({
      tokenId: newRefreshId,
      userId: userData._id,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + expiresMs), // 30 days
      revoked: false,
    });

    // Create new access token
    const accessToken = signAccessToken(
      (userData._id as Types.ObjectId).toString(),
      userData.tokenVersion
    );

    return { accessToken, refreshTokenId: newRefreshId };
  }

  
}

export default new AuthTokenService();
