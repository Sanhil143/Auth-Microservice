import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import os from "os";
import { Application} from "express";

/**
 * Set up swagger documentation for the API
 * @param {Application} app - the Express.js app
 */
export const setupSwagger = (app: Application) => {
  const hostname = os.hostname();
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: process.env.APP_TITLE || "Auth Microservice",
        version: "1.0.0",
        description: process.env.APP_DESCRIPTION || "Handle auth",
      },
      servers: [
        {
          url: `${process.env.SCHEME}://${hostname}:${process.env.PORT || 3000}/api/v1`,
        },
      ],
    },
    apis: ["./server/api/routers/*.ts"],
  };

  const swaggerSpec = swaggerJsdoc(options);

  app.use("/api/v1/swagger/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
   app.get("/api/v1/swagger/json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};
