import { DELETE_RECORDS } from "../db/storedProcedures";

export const delrecService = {
    async getdelrec(queryParams) {
        return await DELETE_RECORDS(queryParams);
    },
}