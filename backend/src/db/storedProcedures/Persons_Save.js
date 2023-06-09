import { StoredProcedure } from '@selesterkft/sel-db';
import { db } from '../dbConnection';

export async function Persons_Save(queryParams) {
  const storedProcedure = new StoredProcedure('Persons_Save')
  storedProcedure.addParam('id', 'Int', queryParams.id);
  storedProcedure.addParam('personname', 'NVarChar', queryParams.PersonName, { length: '250' });
  storedProcedure.addParam('birthday', 'DateTime', queryParams.BirthDay);
  storedProcedure.addParam('emailaddress', 'NVarChar', queryParams.EmailAddress, { length: '250' });
  storedProcedure.addParam('gender', 'Int', queryParams.Gender);
  storedProcedure.addParam('clubid', 'Int', queryParams.ClubID);
  storedProcedure.addOutputParam('out_http_code', 'Int');
  storedProcedure.addOutputParam('out_http_message', 'NVarChar', '', { length: 'max' });
  const sqlResult = await db.callSP(storedProcedure);

  if (sqlResult.output.out_http_code !== 200) {
    const error = new Error(sqlResult.output.out_http_message);
    error.status = sqlResult.output.out_http_code;
    throw error;
  }

  return {}
}