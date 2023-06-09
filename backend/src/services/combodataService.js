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
        console.log('+++ combodataService.js (line: 13)', queryParams);
        let resData = await Combo_DATA_GET(queryParams);
        console.log('+++ combodataService.js (line: 15)', resData);
        let result = [];
        if (queryParams.with0 === "true") {
            resData.data.unshift({ FieldValue: '---' })
        }
        for (var i = 0; i < resData.data.length; i++) {
            result.push(resData.data[i].FieldValue)
        }
        console.log('+++ combodataService.js (line: 21)', result);
        return result;
    },
}
