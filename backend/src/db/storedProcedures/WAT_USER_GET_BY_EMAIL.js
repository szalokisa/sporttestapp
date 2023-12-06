import { StoredProcedure } from '@selesterkft/sel-db';
import { db } from '../dbConnection';

export default async function WAT_USER_GET_BY_EMAIL(email) {
  const storedProcedure = new StoredProcedure("WAT_USER_GET_BY_EMAIL");
  storedProcedure.addParam("email", "NVarChar", email, { length: 128 });
  storedProcedure.addOutputParam("OUT_DATA", "NVarChar", "", { length: "max" });
  storedProcedure.addOutputParam("OUT_HTTP_Code", "Int");
  storedProcedure.addOutputParam("OUT_HTTP_Message", "NVarChar", "", {
    length: "max",
  });

  const sqlResult = await db.callSP(storedProcedure);
  if (sqlResult.output.OUT_HTTP_Code !== 200) {
    const error = new Error(sqlResult.output.OUT_HTTP_Message);
    error.status = sqlResult.output.OUT_HTTP_Code;
    throw error;
  }

  return JSON.parse(sqlResult.output.OUT_DATA);
}
