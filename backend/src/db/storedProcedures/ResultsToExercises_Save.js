import { StoredProcedure } from '@selesterkft/sel-db';
import { db } from '../dbConnection';

export async function ResultsToExercises_Save(queryParams) {
    const storedProcedure = new StoredProcedure('ResultsToExercises_Save')

    storedProcedure.addParam('ID', 'int', queryParams.ID);
    storedProcedure.addParam('ExerciseID', 'int', queryParams.ExerciseID);
    storedProcedure.addParam('ExerciseName', 'NVarChar', queryParams.ExerciseName, { length: '250' });
    storedProcedure.addParam('ResultTypeDescription', 'NVarChar', queryParams.ResultTypeDescription, { length: '250' });
    storedProcedure.addParam('UnitName', 'NVarChar', queryParams.UnitName, { length: '100' });
    storedProcedure.addOutputParam('OUT_HTTP_Code', 'int');
    storedProcedure.addOutputParam('OUT_HTTP_Message', 'NVarChar', '', { length: 'max' });

    const sqlResult = await db.callSP(storedProcedure);
    if (sqlResult.output.OUT_HTTP_Code !== 200) {
        const error = new Error(sqlResult.output.OUT_HTTP_Message);
        error.status = sqlResult.output.OUT_HTTP_Code;
        throw error;
    }

    return {
        columns: sqlResult.columns,
        data: sqlResult.recordset,
    };
}
