import { AddTestLinesToHead } from "../db/storedProcedures";
export const sttlinestoheadService = {
    async getsttlinestohead(queryParams) {
        return await AddTestLinesToHead(queryParams);
    },
}