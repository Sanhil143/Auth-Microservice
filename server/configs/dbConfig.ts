import mongoose from "mongoose";
import l from "../utils/logger.util";

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      // optional mongoose settings
      // /useNewUrlParser: true,
      // useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
  } catch (err:any) {
    l.error(err);
    throw new Error(`MongoDB connection error: ${err}`);
  }
}
