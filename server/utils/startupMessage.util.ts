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
    const hostUrl = `${process.env.SCHEME}://${process.env.HOST}/api/v1`; 

    l.info(`Server running in ${process.env.NODE_ENV} @: ${process.env.HOST}`);
    l.info(`MongoDB connected with ${dbName} @ ${dbHost}`);
    l.info(`Swagger UI: ${hostUrl}/swagger/docs`);
    l.info(`Swagger JSON: ${hostUrl}/swagger/json`);
  };
