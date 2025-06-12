import { StoredProcedure } from '@selesterkft/sel-db';
import { db } from '../dbConnection';

export default async function SYS_GRID_DATA_DELETE(verified, queryParams) {
    const storedProcedure = new StoredProcedure('SYS_GRID_DATA_DELETE')
    storedProcedure.addParam('SYS_GRID_Code', 'NVarChar', queryParams.collection, { length: 128 });
    storedProcedure.addParam('IDS', 'NVarChar', queryParams.ids, { length: 'max' });
    storedProcedure.addParam('UserID', 'Int', verified.id);

    storedProcedure.addOutputParam('OUT_HTTP_Code', 'Int');
    storedProcedure.addOutputParam('OUT_HTTP_Message', 'NVarChar', '', { length: 'max' });

    const sqlResult = await db.callSP(storedProcedure);

    if (sqlResult.output.OUT_HTTP_Code !== 200) {
        const error = new Error(sqlResult.output.OUT_HTTP_Message);
        error.status = sqlResult.output.OUT_HTTP_Code;
        throw error;
    }

    return {};
}
