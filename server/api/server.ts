import express, { Application } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import l from "../utils/logger.util";
import { connectDB } from "../configs/dbConfig";
import { welcome } from "../utils/startupMessage.util";
import { setupSwagger } from "../configs/swagger";

const app: Application = express();

export default class ExpressServer {
  private routes: any;
  constructor() {
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || "100kb" }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || "100kb",
      })
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || "100kb" }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(cors());
    setupSwagger(app);
  }
  router(routes: any) {
    this.routes = routes;
    return this;
  }
  async listen(port: number | string = process.env.PORT || 3000) {
    try {
      // Connect MongoDB first
      await connectDB();
      // Register routes
      if (this.routes) {
        this.routes(app);
      }
      const dbName = mongoose.connection.name;
      const dbHost = mongoose.connection.host;
      // Start server
      http.createServer(app).listen(port, welcome(port, dbName, dbHost));
      return app;
    } catch (err) {
      l.error(err);
      process.exit(1);
    }
  }
}
