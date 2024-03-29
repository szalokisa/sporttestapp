import { EComm_DATA_GET } from "../db/storedProcedures";
import { Save_Data } from "../db/storedProcedures";

export const dataService = {
    async getData(queryParams) {
        return await EComm_DATA_GET(queryParams);
    },

    async saveData(queryParams) {
        return await Save_Data(queryParams);
    },

}