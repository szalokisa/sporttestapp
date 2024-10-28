import { StoredProcedure } from '@selesterkft/sel-db';
import { db } from '../dbConnection';
import { Combo_DATA_GET_Simple } from './Combo_DATA_GET_Simple';

async function FnComboData(queryParams) {
    return await Combo_DATA_GET_Simple(queryParams);

}

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
    let mycomboData = {}
    console.log('+++ Save_Data.js (line: 24)',queryParams);
    if (queryParams.comboidentifier) {
        mycomboData = await FnComboData(queryParams)
        console.log('+++ Save_Data.js (line: 27)',mycomboData);
    }

    return {
        columns: sqlResult.columns,
        data: sqlResult.recordset,
        combodata: mycomboData,
    };
}
