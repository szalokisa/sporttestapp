import { StoredProcedure } from '@selesterkft/sel-db';
import  db_customerPortal  from '../dbConnectionCP';

export default async function WAT_USER_UPDATE(verified, user) {
    const storedProcedure = new StoredProcedure('WAT_USER_UPDATE');
    storedProcedure.addParam('WAT_Users_ID', 'Int', verified.id);
    storedProcedure.addParam('GDPR_Accepted', 'Bit', user.gdprAccepted);
    storedProcedure.addParam('TermsOfServiceAccepted', 'Bit', user.termsOfServiceAccepted);
    storedProcedure.addParam('emailAnnouncementsAccepted', 'Bit', user.emailAnnouncementsAccepted);
    storedProcedure.addParam('newsletterAccepted', 'Bit', user.newsletterAccepted);
    storedProcedure.addParam('Name', 'NVarChar', user.name, {length: 100});
    storedProcedure.addParam('Email', 'NVarChar', user.email, {length: 128});
    storedProcedure.addParam('Password_hash', 'NVarChar', user.passHash, {length: 1024});
    storedProcedure.addParam('Status', 'NVarChar', user.status, {length: 50});
    storedProcedure.addParam('UserLevels_Code', 'NVarChar', verified.userLevel, {length: 20});
    storedProcedure.addParam('Lang', 'NVarChar', (user.language) ? user.language : 'en', {length: 3});
    
    storedProcedure.addOutputParam('OUT_DATA', 'NVarChar', '', {length: 'max'});

    storedProcedure.addOutputParam('OUT_HTTP_Code', 'Int');
    storedProcedure.addOutputParam('OUT_HTTP_Message', 'NVarChar', '', {length: 'max'});
  
    let sqlResult;
    sqlResult = await db_customerPortal.callSP(storedProcedure);
    if (sqlResult.output.OUT_HTTP_Code !== 200) {
        const error = new Error(sqlResult.output.OUT_HTTP_Message);
        error.status = sqlResult.output.OUT_HTTP_Code;
        throw error;
    }

    return JSON.parse(sqlResult.output.OUT_DATA);
}
