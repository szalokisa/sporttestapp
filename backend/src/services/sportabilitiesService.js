import {
    SportAbilities_Read,
    SportAbilities_Save,
    SportAbilities_Delete,
} from "../db/storedProcedures";

export const sportabilitiesService = {
    async read_data(queryParams) {
        return await SportAbilities_Read(queryParams);
    },

    async save_data(queryParams) {
        const sportabilitiesResult = await SportAbilities_Save(queryParams);
        return {
            sportabilitiesResult,
        }
    },

    async delete_data(queryParams) {
        return await SportAbilities_Delete(queryParams);
    },
}
