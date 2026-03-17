import mongoose, { Document } from "mongoose";

export interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
  authTokenId: mongoose.Types.ObjectId;
  deviceInfo?: string;
  ip?: string;
  userAgent?: string;
  lastActivityAt: Date;
  expiresAt: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
