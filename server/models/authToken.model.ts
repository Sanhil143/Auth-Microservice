import mongoose, { Schema, Model } from "mongoose";
import { IAuthToken } from "../interfaces/authToken.interface";

const authTokenSchema = new Schema<IAuthToken>(
  {
    tokenId: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    expiresAt: { type: Date, required: true, index: { expires: "0s" } },
    revoked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const authToken: Model<IAuthToken> =
  mongoose.model<IAuthToken>("authTokens", authTokenSchema);
