export const reportParams = {
    sqlFrom: 'vPersons',
    columns: [
      {
        field: "Message_File_ID",
        width: 50,
      },
      {
        field: "PersonName",
      },
      {
        field: "BirthDay",
        type: "date",
      },
      {
        field: "EmailAddress",
      },
      {
        field: "GenderName",
        "options": ["",
          {
            "value": "1",
            "text": "férfi"
          },
          {
            "value": "2",
            "text": "nő"
          }
        ],
      },
      {
        field: "OrganisationName",
      },
    ],
    groupBy: '',
    orderBy: 'PersonName',
    top: 1000,
    rowCountPerPage: 50,
    selectedFilters: [
      "PersonName",
      "BirthDay",
      "EmailAddress",
      "GenderName",
      "OrganisationName"
    ],
    selectedColumns: [
      "Message_File_ID",
      "PersonName",
      "BirthDay",
      "EmailAddress",
      "GenderName",
      "OrganisationName"
    ],
  };
  