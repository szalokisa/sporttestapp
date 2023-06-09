import { StoredProcedure } from '@selesterkft/sel-db';
import { db } from '../dbConnection';

export async function Persons_Read(queryParams) {
  const storedProcedure = new StoredProcedure('Persons_Read')

  storedProcedure.addParam('ID', 'Int', queryParams.id);
  storedProcedure.addOutputParam('OUT_HTTP_Code', 'Int');
  storedProcedure.addOutputParam('OUT_HTTP_Message', 'NVarChar', '', { length: 'max' });

  const sqlResult = await db.callSP(storedProcedure);
  if (sqlResult.output.OUT_HTTP_Code !== 200) {
    const error = new Error(sqlResult.output.OUT_HTTP_Message);
    error.status = sqlResult.output.OUT_HTTP_Code;
    throw error;
  }
  return {
    // columns: sqlResult.columns,
    data: sqlResult.recordset,
  };
}