import { StoredProcedure } from '@selesterkft/sel-db';
import { db, sqlConfig } from '../dbConnection';

export async function Combo_DATA_GET(queryParams) {
    db.initiateConnection(sqlConfig);
    const storedProcedure = new StoredProcedure('Combo_DATA_GET')
    storedProcedure.addParam('SELECT', 'NVarChar', queryParams.select, { length: 'max' });
    storedProcedure.addParam('TOP', 'int', queryParams.top);
    storedProcedure.addParam('FROM', 'NVarChar', queryParams.from, { length: 'max' });
    storedProcedure.addParam('GROUP_BY', 'NVarChar', queryParams.groupby, { length: 'max' });
    storedProcedure.addParam('ORDER_BY', 'NVarChar', queryParams.orderby, { length: 'max' });
    storedProcedure.addParam('Lang', 'NVarChar', queryParams.language, { length: '10' });
    storedProcedure.addParam('PAGE_NO', 'int', queryParams.PAGE_NO);
    storedProcedure.addParam('ROWS_PER_PAGE', 'int', queryParams.ROWS_PER_PAGE);
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