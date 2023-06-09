import {
    Persons_Read,
    Persons_Save,
    Persons_Delete
} from "../db/storedProcedures";

export const personsService = {
    async read_data(queryParams) {
        return await Persons_Read(queryParams);
    },

    async save_data(queryParams) {
        const personsResult = await Persons_Save(queryParams);
        return {
            personsResult,
        }
    },

    async delete_data(queryParams) {
        return await Persons_Delete(queryParams);
    },
}
