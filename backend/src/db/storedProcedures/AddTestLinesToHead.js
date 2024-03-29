import { StoredProcedure } from '@selesterkft/sel-db';
import { db } from '../dbConnection';

export async function AddTestLinesToHead(queryParams) {
    const storedProcedure = new StoredProcedure('AddTestLinesToHead')

    storedProcedure.addParam('STT_HEAD_ID', 'int', queryParams.HeadID);
    storedProcedure.addOutputParam('OUT_HTTP_Code', 'int');
    storedProcedure.addOutputParam('OUT_HTTP_Message', 'NVarChar', '', { length: 'max' });

    const sqlResult = await db.callSP(storedProcedure);
    if (sqlResult.output.OUT_HTTP_Code !== 200) {
        const error = new Error(sqlResult.output.OUT_HTTP_Message);
        error.status = sqlResult.output.OUT_HTTP_Code;
        console.log('AddTestLinesToHead.js (line: 16)', error);
        throw error;
    }
    return {
        columns: sqlResult.columns,
        data: sqlResult.recordset,
    };
}
