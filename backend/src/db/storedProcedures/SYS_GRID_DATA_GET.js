import { StoredProcedure } from '@selesterkft/sel-db';
import { db } from '../dbConnection';

export default async function SYS_GRID_DATA_GET(verified, queryParams) {
  const storedProcedure = new StoredProcedure('SYS_GRID_DATA_GET')

  storedProcedure.addParam('SYS_GRID_Code', 'NVarChar', queryParams.gridCode, { length: 128 });
  storedProcedure.addParam('SQL_TOP', 'Int', queryParams.limit || 0);
  storedProcedure.addParam('SQL_WHERE', 'NVarChar', queryParams.where, { length: 'max' });
  storedProcedure.addParam('SQL_ORDER_BY', 'NVarChar', queryParams.sort, { length: 'max' });
  storedProcedure.addParam('LANG', 'NVarChar', queryParams.language, { length: 10 });
  storedProcedure.addParam('PAGE_NO', 'Int', queryParams.pageNo);
  storedProcedure.addParam('ROWS_PER_PAGE', 'Int', queryParams.rowsPerPage);
  storedProcedure.addOutputParam('OUT_HTTP_Code', 'Int');
  storedProcedure.addOutputParam('OUT_HTTP_Message', 'NVarChar', '', { length: 'max' });
  const sqlResult = await db.callSP(storedProcedure);
  return {
    columns: sqlResult.columns,
    data: sqlResult.recordset,
  };
}
