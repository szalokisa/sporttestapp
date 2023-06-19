import {
    Exercises_Read,
    Exercises_Save,
    Exercises_Delete,
    ResultsToExercises_Save,
} from "../db/storedProcedures";

export const exercisesService = {
    async read_data(queryParams) {
        return await Exercises_Read(queryParams);
    },

    async save_data(queryParams) {
        const sportabilitiesResult = await Exercises_Save(queryParams);
        return {
            sportabilitiesResult,
        }
    },
    
    async delete_data(queryParams) {
        return await Exercises_Delete(queryParams);
    },
    
    async save_restoex(queryParams) {
        const saveresresult = await ResultsToExercises_Save(queryParams);
        return {
            saveresresult,
        }
    },
}
