import { StoredProcedure } from '@selesterkft/sel-db';
import  db_customerPortal  from '../dbConnectionCP';

export default async function WAT_USER_PARAMS_GET(userId) {
    const storedProcedure = new StoredProcedure('WAT_USER_PARAMS_GET');
    storedProcedure.addParam('UsersID', 'Int', userId);
    storedProcedure.addOutputParam('OUT_User_Params', 'NVarChar', '', { length: 'max' });
    storedProcedure.addOutputParam('OUT_UserLevel_Params', 'NVarChar', '', { length: 'max' });
    storedProcedure.addOutputParam('OUT_Portal_Owners_Params', 'NVarChar', '', { length: 'max' });
    storedProcedure.addOutputParam('OUT_Portal_Owners_Partner_Params', 'NVarChar', '', { length: 'max' });
    storedProcedure.addOutputParam('OUT_HTTP_Code', 'Int');
    storedProcedure.addOutputParam('OUT_HTTP_Message', 'NVarChar', '', { length: 'max' });

    let sqlResult;
    sqlResult = await db_customerPortal.callSP(storedProcedure);

    return {
        userParams: JSON.parse(sqlResult.output.OUT_User_Params),
        userLevelParams: JSON.parse(sqlResult.output.OUT_UserLevel_Params),
        partnerParams: JSON.parse(sqlResult.output.OUT_Portal_Owners_Partner_Params),
    };
}
