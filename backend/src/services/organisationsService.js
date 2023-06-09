import {
    Organisations_Read,
    Organisations_Save,
    Organisations_Delete
} from "../db/storedProcedures";

export const organisationsService = {
    async read_data(queryParams) {
        return await Organisations_Read(queryParams);
    },

    async save_data(queryParams) {
        const organisationsResult = await Organisations_Save(queryParams);
        return {
            organisationsResult,
        }
    },

    async delete_data(queryParams) {
        return await Organisations_Delete(queryParams);
    },
}
