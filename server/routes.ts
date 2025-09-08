import { Application } from "express";
import authRouter from "./api/routes/auth.route";
import authTokenRouter from "./api/routes/authToken.route";

export default function routes(app: Application): void {
  app.use("/auth/api/v1/auth", authRouter);
  app.use("/auth/api/v1/authToken", authTokenRouter);
}
