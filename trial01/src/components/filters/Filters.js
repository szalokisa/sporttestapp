/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import FilterField from './FilterField';

export default function Filters(props) {
  const selectedFilters = props?.reportParams?.selectedFilters;
  if (!selectedFilters) {
    return <></>;
  }

  const filters = selectedFilters.map((fieldName) => {
    const column = props.reportParams.columns.find(
      (col) => col.field === fieldName,
    );
    const filterField = {
      fieldName,
      filterType: column.type,
      options: column.options,
    };
    return filterField;
  });

  return (
    <div>
      {filters.map((filterField) => (
        <FilterField
          key={`filter-${filterField.fieldName}`}
          fieldName={filterField.fieldName}
          filterType={filterField.filterType}
          options={filterField.options}
          language={props.language}
          languageElements={props.languageElements}
        />
      ))}
    </div>
  );
}
