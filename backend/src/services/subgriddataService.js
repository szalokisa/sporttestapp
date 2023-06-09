import { SubGrid_DATA_GET } from "../db/storedProcedures";

export const subgriddataService = {
    async getsubgriddata(queryParams) {
        return await SubGrid_DATA_GET(queryParams);
    },
}
