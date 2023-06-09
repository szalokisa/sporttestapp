import { useState, useEffect, useRef } from 'react';
import { Accordion } from 'bootstrap';
import DataGrid from '../dataGrid/DataGrid2';
import Filters from '../filters/Filters';
import LanguageElementsHandler from '../../repository/LanguageElementsHandler';
import ExcelExport from '../excelExport/ExcelExport';
import RefreshIcon from './reload.svg';
import PlusIcon from './plus.svg';
import './GridReport.scss';

export default function GridReport(props) {
  const languageElementsHandler = new LanguageElementsHandler(
    props.report.languageElements,
    props.language,
  );

  const accordionData = useRef();
  const [dataLoadingState, setDataLoadingState] = useState('NOT PREPARED');
  const [gridData, setGridData] = useState([]);
  const [gridColumns, setGridColumns] = useState([]);

  useEffect(() => {
    setDataLoadingState('NOT PREPARED');
    setGridColumns(
      props.report.reportParams.selectedColumns.map((columnName) => {
        const columnDef = props.report.reportParams.columns.find(
          (column) => column.field === columnName,
        );
        return {
          field: columnName,
          type: columnDef.type,
          width: columnDef.width,
          options: columnDef.options,
          pinned: columnDef.pinned,
        };
      }),
    );
    setDataLoadingState('NOT LOADED');
  }, []);

  useEffect(() => {
    showDataIfNotCollapsed();
  }, [props.language, props.refreshId || 0]);

  function showDataIfNotCollapsed() {
    if (accordionData.current) {
      if (!accordionData.current.classList.contains('collapsed')) {
        showData();
      }
    }
  }

  function addNew() {
    props.onAddNew();
  }

  function getFilter() {
    let filterFields = Array.from(
      document.querySelectorAll(".reportFilter")
    ).filter((e) => e.value);

    if (filterFields.length === 0) {
      return {};
    }

    let filters = filterFields.map((filterField) => {
      let filter = {};

      if (filterField.dataset.comparator) {
        let expression = {};
        expression[filterField.dataset.comparator] = filterField.value;
        filter[filterField.dataset.field] = expression;
      } else {
        filter[filterField.dataset.field] = filterField.value;
      }
      return filter;
    });

    return { $and: filters };
  }

  function showData() {
    setDataLoadingState('LOADING');
    fetch(`${props.dataEndpoint}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      token: props.token,
      headers: {
        'Content-Type': 'application/json',
        language: props.language,
        select: props.report.reportParams.selectedColumns,
        top: props.report.reportParams.top,
        from: props.report.reportParams.sqlFrom,
        where: getFilter(),
        groupby: props.report.reportParams.groupBy,
        orderby: props.report.reportParams.orderBy,
        token: props.token,
      },
    })
      .then((data) => {
        if (data.status !== 200) {
          setDataLoadingState('NOT LOADED');
          const error = new Error('invalid');
          error.status = data.status;
          throw error;
        }
        return data.json();
      })
      .then((jsonData) => {
        setGridData(jsonData);
        setDataLoadingState('LOADED');
      })
      .catch(() => {
        setDataLoadingState('NOT LOADED');
      });
  }
  return (
    <div className="grid-report">
      <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="grid-report-flush-filter">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapse-filter"
              aria-expanded="false"
              aria-controls="flush-collapse-filter"
            >
              {languageElementsHandler.get('flush-filter')}
            </button>
          </h2>
          <div
            id="flush-collapse-filter"
            className="accordion-collapse collapse"
            aria-labelledby="grid-report-flush-filter"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <Filters
                reportParams={props.report.reportParams}
                languageElements={props.report.languageElements}
                language={props.language}
              />
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="grid-report-flush-data">
            <button
              ref={accordionData}
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapse-data"
              aria-expanded="false"
              aria-controls="flush-collapse-data"
              onClick={() => showDataIfNotCollapsed()}
            >
              {languageElementsHandler.get('flush-data')}
            </button>
          </h2>
          <div
            id="flush-collapse-data"
            className="accordion-collapse collapse"
            aria-labelledby="grid-report-flush-data"
            data-bs-parent="#accordionFlushExample"
          >
            {dataLoadingState === 'LOADING' && (
              <div className="accordion-body loading-spinner">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {dataLoadingState === 'LOADED' && (
              <div className="accordion-body">
                <div className="accordion-body-header">
                  {props.onAddNew &&
                    <button type="button" className="btn btn-warning btn-add" onClick={addNew}>
                      <img className="Add-icon" src={PlusIcon} alt="Refresh-icon.svg" />
                    </button>
                  }
                  <button type="button" className="btn btn-warning btn-refresh-report" onClick={showDataIfNotCollapsed}>
                    <img className="Refresh-icon" src={RefreshIcon} alt="Refresh-icon.svg" />
                  </button>
                  <ExcelExport data={gridData} />
                </div>
                <DataGrid
                  id={`${props.id}-dataGrid`}
                  columns={gridColumns}
                  language={props.language}
                  languageElements={props.report.languageElements}
                  data={gridData}
                  frameworkComponents={props.report.frameWorkComponents}
                  cellRenderers={props.report.cellRenderers}
                  rowSelection={props.rowSelection}
                  rowMultiSelectWithClick={props.rowMultiSelectWithClick}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
