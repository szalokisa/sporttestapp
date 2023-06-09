export const reportParams = {
    sqlFrom: 'vOrganisations',
    columns: [
      {
        field: "Message_File_ID",
        width: 50,
      },
      {
        field: "OrganisationName",
      },
      {
        field: "EmailAddress",
      },
    ],
    groupBy: '',
    orderBy: 'OrganisationName',
    top: 1000,
    rowCountPerPage: 50,
    selectedFilters: [
      "OrganisationName",
      "EmailAddress",
    ],
    selectedColumns: [
      "Message_File_ID",
      "OrganisationName",
      "EmailAddress",
    ],
  };