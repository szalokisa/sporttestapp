import { query } from "express";
import SYS_GRID_DATA_DELETE from "../db/storedProcedures/SYS_GRID_DATA_DELETE";
import SYS_GRID_DATA_GET from "../db/storedProcedures/SYS_GRID_DATA_GET";
import SYS_GRID_DATA_UPSERT from "../db/storedProcedures/SYS_GRID_DATA_UPSERT";
import { verifyLoginToken } from "../middlewares/verifyToken";

export const dataService = {
    async deleteById(verified, queryParams) {
        return await SYS_GRID_DATA_DELETE(verified, queryParams);
    },

    async getData(verified, queryParams) {
        return await SYS_GRID_DATA_GET(verified, queryParams);
    },

    async upsertRecords(verified, queryParams) {
        return await SYS_GRID_DATA_UPSERT(verified, queryParams);
    },
};
