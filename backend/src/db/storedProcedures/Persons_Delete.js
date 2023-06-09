import { StoredProcedure } from '@selesterkft/sel-db';
import { db } from '../dbConnection';

export async function Persons_Delete(queryParams) {
    const storedProcedure = new StoredProcedure('Persons_Delete')

    storedProcedure.addParam('id', 'int', queryParams.id);
    storedProcedure.addOutputParam('out_http_code', 'int');
    storedProcedure.addOutputParam('out_http_message', 'NVarChar', '', { length: 'max' });

    const sqlResult = await db.callSP(storedProcedure);
    if (sqlResult.output.out_http_code !== 200) {
        const error = new Error(sqlResult.output.OUT_HTTP_Message);
        error.status = sqlResult.output.OUT_HTTP_Code;
        throw error;
    }

    return {
        columns: sqlResult.columns,
        data: sqlResult.recordset,
    };
}
