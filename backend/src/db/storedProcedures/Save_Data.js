import { StoredProcedure } from '@selesterkft/sel-db';
import { db } from '../dbConnection';

export async function Save_Data(queryParams) {
    const storedProcedure = new StoredProcedure('Save_Data')
    storedProcedure.addParam('ID', 'int', queryParams.ID);
    storedProcedure.addParam('Identifier', 'NVarChar', queryParams.Identifier, { length: '250' });
    storedProcedure.addParam('Data', 'NVarChar', JSON.stringify(queryParams.Data), { length: 'max' });
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
