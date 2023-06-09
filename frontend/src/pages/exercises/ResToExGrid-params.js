export const reportParams = {
    sqlFrom: 'vResToEx',
    columns: [
      {
        field: "Message_File_ID",
        width: 50,
      },
      {
        field: "ExerciseID",
        width: 50,
      },
      {
        field: "UnitTypesID",
      },
      {
        field: "ResultTypeDescription",
        width: 350,
      },
    ],
    groupBy: '',
    orderBy: 'UnitTypesID',
    top: 1000,
    rowCountPerPage: 50,
    selectedFilters: [
      "ExerciseID"
    ],
    selectedColumns: [
      "Message_File_ID",
      "UnitTypesID",
      "ResultTypeDescription",
    ],
  };
  