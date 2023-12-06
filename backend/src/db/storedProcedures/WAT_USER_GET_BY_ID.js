import { StoredProcedure } from '@selesterkft/sel-db';
import { db } from '../dbConnection';


export default async function WAT_USER_GET_BY_ID(userId) {

    const storedProcedure = new StoredProcedure('WAT_USER_GET_BY_ID')

    storedProcedure.addParam('WAT_Users_ID', 'int', userId);
    storedProcedure.addOutputParam('OUT_DATA', 'NVarChar', '', { length: 'max' });
    storedProcedure.addOutputParam('OUT_HTTP_Code', 'int');
    storedProcedure.addOutputParam('OUT_HTTP_Message', 'NVarChar', '', { length: 'max' });

    let sqlResult;
    sqlResult = await db.callSP(storedProcedure);

    return JSON.parse(sqlResult.output.OUT_DATA);
}
