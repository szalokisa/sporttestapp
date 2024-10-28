import { StoredProcedure } from '@selesterkft/sel-db';
import { db } from '../dbConnection';

export async function Combo_DATA_GET_Simple(queryParams) {
    console.log('+++ Combo_DATA_GET_Simple.js (line: 5)', queryParams);
    const storedProcedure = new StoredProcedure('Combo_DATA_GET_Simple')
    storedProcedure.addParam('Identifier', 'NVarChar', queryParams.comboidentifier, { length: '250' });
    storedProcedure.addOutputParam('OUT_HTTP_Code', 'int');
    storedProcedure.addOutputParam('OUT_HTTP_Message', 'NVarChar', '', { length: 'max' });

    const sqlResult = await db.callSP(storedProcedure);
    if (sqlResult.output.OUT_HTTP_Code !== 200) {
        const error = new Error(sqlResult.output.OUT_HTTP_Message);
        error.status = sqlResult.output.OUT_HTTP_Code;
        throw error;
    }
    let result = [];
    if (queryParams.with0 === "true") {
        sqlResult.recordset.unshift({ FieldValue: '---' })
    }
    for (var i = 0; i < sqlResult.recordset.length; i++) {
        result.push(sqlResult.recordset[i].FieldValue)
    }

    return {
        columns: sqlResult.columns,
        data: result,
    };
}



// -----------------------------------------------------// src\db\storedProcedures\index.js
