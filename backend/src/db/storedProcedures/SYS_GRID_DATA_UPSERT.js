import { StoredProcedure } from '@selesterkft/sel-db';
import { db } from '../dbConnection';

export default async function SYS_GRID_DATA_UPSERT(verified, queryParams) {
    console.log('!!!SSS SYS_GRID_DATA_UPSERT.js (line: 5)',queryParams);
    const storedProcedure = new StoredProcedure('SYS_GRID_DATA_UPSERT')
    storedProcedure.addParam('SYS_GRID_Code', 'NVarChar', queryParams.collection, { length: 128 });
    storedProcedure.addParam('DATA', 'NVarChar', JSON.stringify(queryParams.data), { length: 'max' });
    storedProcedure.addParam('userName', 'NVarChar', queryParams.userName, { length: 250 });
    storedProcedure.addOutputParam('OUT_SAVED_DATA', 'NVarChar', '', { length: 'max' });
    storedProcedure.addOutputParam('OUT_HTTP_Code', 'Int');
    storedProcedure.addOutputParam('OUT_HTTP_Message', 'NVarChar', '', { length: 'max' });

    const sqlResult = await db.callSP(storedProcedure);

    if (sqlResult.output.OUT_HTTP_Code !== 200) {
        const error = new Error(sqlResult.output.OUT_HTTP_Message);
        error.status = sqlResult.output.OUT_HTTP_Code;
        throw error;
    }
   
    let mycomboData = {}
    console.log('+++ Save_Data.js (line: 24)', queryParams);
    if (queryParams.comboidentifier) {
        mycomboData = await FnComboData(queryParams)
        console.log('+++ Save_Data.js (line: 27)', mycomboData);
    }

    return {
        data: sqlResult.output.OUT_SAVED_DATA,
    };
}
