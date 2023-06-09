import { StoredProcedure } from '@selesterkft/sel-db';
import { db } from '../dbConnection';

export async function SubGrid_DATA_GET(queryParams) {
    const storedProcedure = new StoredProcedure('SubGrid_DATA_GET')

    storedProcedure.addParam('SELECT', 'NVarChar', queryParams.SELECT, { length: 'max' });
    storedProcedure.addParam('TOP', 'int', queryParams.TOP);
    storedProcedure.addParam('FROM', 'NVarChar', queryParams.FROM, { length: 'max' });
    storedProcedure.addParam('GROUP_BY', 'NVarChar', queryParams.GROUP_BY, { length: 'max' });
    storedProcedure.addParam('ORDER_BY', 'NVarChar', queryParams.ORDER_BY, { length: 'max' });
    storedProcedure.addParam('Lang', 'NVarChar', queryParams.Lang, { length: '10' });
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
