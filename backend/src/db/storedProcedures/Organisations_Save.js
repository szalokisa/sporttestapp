import { StoredProcedure } from '@selesterkft/sel-db';
import { db } from '../dbConnection';

export async function Organisations_Save(queryParams) {
    const storedProcedure = new StoredProcedure('Organisations_Save')
    storedProcedure.addParam('ID', 'int', queryParams.id);
    storedProcedure.addParam('OrganisationName', 'NVarChar', queryParams.OrganisationName, { length: '250' });
    storedProcedure.addParam('EmailAddress', 'NVarChar', queryParams.EmailAddress, { length: '250' });
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
