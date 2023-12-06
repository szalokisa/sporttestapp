import logger from "@selesterkft/express-logger";
import { DB } from "@selesterkft/sel-db";

export const sqlConfig_customerPortal = {
  server: process.env.CUSTOMERPORTAL_DB_SERVER,
  options: {
    database: process.env.CUSTOMERPORTAL_DB_DATABASE,
    encrypt: process.env.CUSTOMERPORTAL_DB_ENCRYPT === "true",
    trustServerCertificate: true,
    requestTimeout: process.env.CUSTOMERPORTAL_DB_TIMEOUT
      ? parseInt(process.env.CUSTOMERPORTAL_DB_TIMEOUT)
      : 120000,
    cancelTimeout: 120000,
    rowCollectionOnDone: true,
    port: process.env.CUSTOMERPORTAL_DB_PORT
      ? parseInt(process.env.CUSTOMERPORTAL_DB_PORT)
      : 1433,
  },
  authentication: {
    type: "default",
    options: {
      userName: process.env.CUSTOMERPORTAL_DB_USER,
      password: process.env.CUSTOMERPORTAL_DB_PASSWORD,
    },
  },
};

const db_customerPortal = new DB();
export default db_customerPortal;
