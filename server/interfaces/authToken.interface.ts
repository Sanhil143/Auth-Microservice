import mongoose, { Document } from "mongoose";

export interface IAuthToken extends Document {
  tokenId: string;
  userId: mongoose.Types.ObjectId;
  expiresAt: Date;
  createdAt: Date;
  revoked: boolean;
}

export interface IRefreshResponse {
  accessToken: string;
  refreshTokenId: string;
}
