import { StoredProcedure } from '@selesterkft/sel-db';
import { db } from '../dbConnection';
import { Combo_DATA_GET_Simple } from './Combo_DATA_GET_Simple';

async function FnComboData(queryParams) {
    return await Combo_DATA_GET_Simple(queryParams);
}

export async function DELETE_RECORDS(queryParams) {
    const storedProcedure = new StoredProcedure('DELETE_RECORDS')
    storedProcedure.addParam('JSONDATA', 'NVarChar', queryParams.data, { length: 'max' });
    storedProcedure.addParam('TABLENAME', 'NVarChar', queryParams.datatable, { length: '100' });
    storedProcedure.addOutputParam('OUT_HTTP_Code', 'int');
    storedProcedure.addOutputParam('OUT_HTTP_Message', 'NVarChar', '', { length: 'max' });

    const sqlResult = await db.callSP(storedProcedure);
    if (sqlResult.output.OUT_HTTP_Code !== 200) {
        const error = new Error(sqlResult.output.OUT_HTTP_Message);
        error.status = sqlResult.output.OUT_HTTP_Code;
        throw error;
    }
    let mycomboData = {}
    console.log('+++ DELETE_RECORDS.js (line: 23)', queryParams);
    if (queryParams.comboidentifier) {
        mycomboData = await FnComboData(queryParams)
        console.log('+++ DELETE_RECORDS.js (line: 26)',mycomboData);
    }

    return {
        columns: sqlResult.columns,
        data: sqlResult.recordset,
        combodata: mycomboData,
    };
}
