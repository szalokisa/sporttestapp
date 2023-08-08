import { DELETE_RECORDS } from "../db/storedProcedures";

export const delrecService = {
    async getdelrec(queryParams) {
        console.log('+++ delrecService.js (line: 4)',queryParams);
        return await DELETE_RECORDS(queryParams);
    },
}