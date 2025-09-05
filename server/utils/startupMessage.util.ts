import os from "os";
import l from "./logger.util";


/**
 * Logs a welcome message to the console with server details and Swagger UI path.
 * @param {number|string} port - The port number the server is running on.
 * @param {string} dbName - The name of the MongoDB database.
 * @param {string} dbHost - The host name of the MongoDB server.
 * @returns {() => void} A function that logs the welcome message when called.
 */
export const welcome =
  (port: number | string, dbName: string, dbHost: string) => () => {
    const hostname = os.hostname();
    const hostUrl = `${process.env.SCHEME}://${hostname}:${port}/api/v1`; 

    l.info(`Server running in ${process.env.NODE_ENV} @: ${hostname} on port: ${port}`);
    l.info(`MongoDB connected with ${dbName} @ ${dbHost}`);
    l.info(`Swagger UI: ${hostUrl}/swagger/docs`);
    l.info(`Swagger JSON: ${hostUrl}/swagger/json`);
  };
