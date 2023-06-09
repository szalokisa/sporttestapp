import { StoredProcedure } from '@selesterkft/sel-db';
import { db } from '../dbConnection';

export async function Exercises_Save(queryParams) {
    console.log('+++ Exercises_Save.js (line: 5)', queryParams);
    const storedProcedure = new StoredProcedure('Exercises_Save')
    storedProcedure.addParam('ID', 'int', queryParams.ID);
    storedProcedure.addParam('ExerciseName', 'NVarChar', queryParams.ExerciseName, { length: '250' });
    storedProcedure.addParam('ExerciseDescription', 'NVarChar', queryParams.ExerciseDescription, { length: 'max' });
    storedProcedure.addParam('SportAbilityName', 'NVarChar', queryParams.SportAbilityName, { length: '250' });
    storedProcedure.addOutputParam('OUT_HTTP_Code', 'int');
    storedProcedure.addOutputParam('OUT_HTTP_Message', 'NVarChar', '', { length: 'max' });

    const sqlResult = await db.callSP(storedProcedure);
    console.log('+++ Exercises_Save.js (line: 15)', sqlResult.output);
    if (sqlResult.output.OUT_HTTP_Code !== 200) {
        const error = new Error(sqlResult.output.OUT_HTTP_Message);
        error.status = sqlResult.output.OUT_HTTP_Code;
        console.log('+++ Exercises_Save.js (line: 18)', error);
        throw error;
    }

    return {
        columns: sqlResult.columns,
        data: sqlResult.recordset,
    };
}
