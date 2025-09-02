import os from "os";
import l from "./logger.util";
export const welcome =
  (port: number | string, dbName: string, dbHost: string) => () => {
    const hostname = os.hostname();
    const hostUrl = `${process.env.SCHEME}://${hostname}:${port}/api/v1`; 

    l.info(`Server running in ${process.env.NODE_ENV} @: ${hostname} on port: ${port}`);
    l.info(`MongoDB connected with ${dbName} @ ${dbHost}`);
    l.info(`Swagger UI: ${hostUrl}/swagger/docs`);
    l.info(`Swagger JSON: ${hostUrl}/swagger/json`);
  };
