import { Combo_DATA_GET } from "../db/storedProcedures";

export const combodataService = {
    async getcombodata(queryParams) {
        let result = await Combo_DATA_GET(queryParams);
        if (queryParams.with0 === "true") {
            result.data.unshift({ value: 0, text: '---' })
        }
        return result;
    },

    async getgridcombodata(queryParams) {
        let resData = await Combo_DATA_GET(queryParams);
        let result = [];
        if (queryParams.with0 === "true") {
            resData.data.unshift({ FieldValue: '---' })
        }
        for (var i = 0; i < resData.data.length; i++) {
            result.push(resData.data[i].FieldValue)
        }
        return result;
    },
}
