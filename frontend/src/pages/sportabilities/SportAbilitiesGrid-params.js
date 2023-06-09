export const reportParams = {
    sqlFrom: 'vSportAbilities',
    columns: [
      {
        field: "Message_File_ID",
        width: 50,
      },
      {
        field: "SportAbilityName",
      },
      {
        field: "Remark",
        width: 350,
      },
    ],
    groupBy: '',
    orderBy: 'SportAbilityName',
    top: 1000,
    rowCountPerPage: 50,
    selectedFilters: [
      "SportAbilityName",
      "Remark",
    ],
    selectedColumns: [
      "Message_File_ID",
      "SportAbilityName",
      "Remark",
    ],
  };
  