import mongoose, { Schema, Model } from "mongoose";
import { ISession } from "../interfaces/session.interface";

const sessionSchema = new Schema<ISession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    authTokenId: { type: Schema.Types.ObjectId, ref: "authTokens", required: true },
    deviceInfo: { type: String },
    ip: { type: String },
    userAgent: { type: String },
    lastActivityAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

sessionSchema.index({ userId: 1 });
sessionSchema.index({ authTokenId: 1 }, { unique: true });

export const session: Model<ISession> =
  mongoose.model<ISession>("sessions", sessionSchema);
