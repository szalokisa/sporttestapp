import { StoredProcedure } from '@selesterkft/sel-db';
import { db } from '../dbConnection';

export async function DELETE_RECORDS(queryParams) {
    const storedProcedure = new StoredProcedure('DELETE_RECORDS')
    storedProcedure.addParam('JSONDATA', 'NVarChar', queryParams.data, { length: 'max' });
    storedProcedure.addParam('TABLENAME', 'NVarChar', queryParams.datatable, { length: '100' });
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
