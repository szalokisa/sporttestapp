import { StoredProcedure } from '@selesterkft/sel-db';
import { db } from '../dbConnection';

export async function USERS_CREATE(queryParams) {
  const storedProcedure = new StoredProcedure('USERS_CREATE')
  storedProcedure.addParam('login', 'NVarChar', queryParams.login, { length: 'max' });
  storedProcedure.addParam('passHash', 'NVarChar', queryParams.passHash, { length: 'max' });
  storedProcedure.addParam('userLevel', 'NVarChar', queryParams.userlevel, { length: 'max' });
  storedProcedure.addParam('params', 'NVarChar', queryParams.params, { length: 'max' });

  storedProcedure.addOutputParam('OUT_HTTP_Code', 'Int');
  storedProcedure.addOutputParam('OUT_HTTP_Message', 'NVarChar', '', { length: 'max' });

  const sqlResult = await db.callSP(storedProcedure);

  if (sqlResult.output.OUT_HTTP_Code !== 200) {
    const error = new Error(sqlResult.output.OUT_HTTP_Message);
    error.status = sqlResult.output.OUT_HTTP_Code;
    throw error;
  }

  return {}
}
