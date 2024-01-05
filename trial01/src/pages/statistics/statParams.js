export const statParams = {
    sqlFrom: 'vStatistics',
    columns: [
        {
            field: "TLID",
            type: "int",
            width: 50,
        },
        {
            field: "PLACE",
            type: "string",
            width: 100,
        },
        {
            field: "DT",
            type: "date",
            width: 100,
        },
        {
            field: "HREMARK",
            type: "string",
            width: 100,
        },
        {
            field: "TestTemplatesName",
            type: "string",
            width: 100,
        },
        {
            field: "PersonName",
            type: "string",
            width: 100,
        },
        {
            field: "SportAbilityName",
            type: "string",
            width: 100,
        },
        {
            field: "ExerciseName",
            type: "string",
            width: 100,
        },
        {
            field: "ResultTypeDescription",
            type: "string",
            width: 100,
        },
        {
            field: "RESULT",
            type: "string",
            width: 100,
        },
        {
            field: "UnitName",
            type: "string",
            width: 100,
        },
        {
            field: "LINEREMARK",
            type: "string",
            width: 100,
        },
    ],
    groupBy: '',
    orderBy: 'DT, TestTemplatesName, PersonName',
    top: 1000,
    rowCountPerPage: 50,
    selectedFilters: [
        "PLACE",
        "DT",
        "PersonName",
        "SportAbilityName",
        "ExerciseName",
    ],
    selectedColumns: [
        "TLID",
        "PLACE",
        "DT",
        "HREMARK",
        "TestTemplatesName",
        "PersonName",
        "SportAbilityName",
        "ExerciseName",
        "ResultTypeDescription",
        "RESULT",
        "UnitName",
        "LINEREMARK",
    ],

};