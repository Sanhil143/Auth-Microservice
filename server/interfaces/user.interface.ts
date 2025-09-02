import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  tokenVersion: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
