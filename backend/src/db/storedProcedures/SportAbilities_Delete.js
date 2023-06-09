import { StoredProcedure } from '@selesterkft/sel-db';
import { db } from '../dbConnection';

export async function SportAbilities_Delete(queryParams) {
    const storedProcedure = new StoredProcedure('SportAbilities_Delete')
    storedProcedure.addParam('id', 'int', queryParams.id);
    storedProcedure.addOutputParam('out_http_code', 'int');
    storedProcedure.addOutputParam('out_http_message', 'NVarChar', '', { length: 'max' });
    const sqlResult = await db.callSP(storedProcedure);
    if (sqlResult.output.out_http_code !== 200) {
        const error = new Error(sqlResult.output.OUT_HTTP_Message);
        error.status = sqlResult.output.out_http_code;
        throw error;
    }

    return {
        columns: sqlResult.columns,
        data: sqlResult.recordset,
    };
}
