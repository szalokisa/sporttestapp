import { StoredProcedure } from '@selesterkft/sel-db';
import  db_customerPortal  from '../dbConnectionCP';

export default async function WAT_USER_DELETE_BY_ID(userId) {
    const storedProcedure = new StoredProcedure('WAT_USER_DELETE_BY_ID');
    storedProcedure.addParam('WAT_Users_ID', 'Int', userId);
  
    await db_customerPortal.callSP(storedProcedure);

    return {}
}
