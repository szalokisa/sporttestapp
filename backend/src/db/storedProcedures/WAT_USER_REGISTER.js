import { StoredProcedure } from '@selesterkft/sel-db';
import { db } from '../dbConnection';

export async function WAT_USER_REGISTER(queryParams) {
  const storedProcedure = new StoredProcedure('WAT_USER_REGISTER')
  storedProcedure.addParam('User_Group_ID', 'int', queryParams.user_group_id);
  storedProcedure.addParam('UserLevels_Code', 'NVarChar', queryParams.userlevels_code, { length: '20' });
  storedProcedure.addParam('User_Group_Levels_Code', 'NVarChar', queryParams.user_group_levels_code, { length: '20' });
  storedProcedure.addParam('Name', 'NVarChar', queryParams.name, { length: '100' });
  storedProcedure.addParam('Lang', 'NVarChar', queryParams.lang, { length: '3' });
  storedProcedure.addParam('Email', 'NVarChar', queryParams.email, { length: '128' });
  storedProcedure.addParam('Password_hash', 'VarChar', queryParams.passHash, { length: '1024' });
  storedProcedure.addOutputParam('OUT_DATA', 'NVarChar', '', { length: 'max' });
  storedProcedure.addOutputParam('OUT_HTTP_Code', 'int');
  storedProcedure.addOutputParam('OUT_HTTP_Message', 'NVarChar', '', { length: 'max' });

  const sqlResult = await db.callSP(storedProcedure);
  if (sqlResult.output.OUT_HTTP_Code !== 200) {
    const error = new Error(sqlResult.output.OUT_HTTP_Message);
    error.status = sqlResult.output.OUT_HTTP_Code;
    throw error;
  }

  return {
    columns: sqlResult.columns,
    data: sqlResult.recordset,
  };
}
