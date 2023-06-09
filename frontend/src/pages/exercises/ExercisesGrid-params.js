export const reportParams = {
    sqlFrom: 'vExercises',
    columns: [
      {
        field: "Message_File_ID",
        width: 50,
      },
      {
        field: "ExerciseName",
      },
      {
        field: "ExerciseDescription",
        width: 350,
      },
      {
        field: "SportAbilityName",
      },
      {
        field: "ResToExString",
      },
    ],
    groupBy: '',
    orderBy: 'ExerciseName',
    top: 1000,
    rowCountPerPage: 50,
    selectedFilters: [
      "ExerciseName",
      "SportAbilityName",
    ],
    selectedColumns: [
      "Message_File_ID",
      "ExerciseName",
      "ExerciseDescription",
      "SportAbilityName",
      "ResToExString"
    ],
  };
  