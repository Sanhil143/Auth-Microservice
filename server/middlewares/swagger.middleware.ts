import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application} from "express";

/**
 * Set up swagger documentation for the API
 * @param {Application} app - the Express.js app
 */
export const setupSwagger = (app: Application) => {
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
          url: `${process.env.SCHEME}://${process.env.HOST}/auth/api/v1`,
        },
      ],
    },
    apis: ["./server/api/routes/*.ts"],
  };

  const swaggerSpec = swaggerJsdoc(options);

  app.use("/auth/api/v1/swagger/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
   app.get("/auth/api/v1/swagger/json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};
