import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Accordion } from 'bootstrap';
import Filters from '../../components/filters/Filters'
import { statParams } from './statParams';
import { languageElements } from './statLanguageElements';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import ExcelExport from '../../components/excelExport/ExcelExport';
import Chart01 from './chart01';

const DataURL = `${process.env.REACT_APP_API_BASE_URL}/data`;

function PageStatistics(props) {
    const accordionData = useRef();
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
    const [dataLoadingState, setDataLoadingState] = useState('NOT PREPARED');
    const [gridColumns, setGridColumns] = useState([]);

    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'TLID',
            hide: true
        },
        {
            field: 'THID',
            hide: true
        },
        {
            headerName: 'Hely',
            field: 'PLACE',
            filter: true,
            minWidth: 200,
            editable: false
        },
        {
            headerName: 'Dátum',
            field: 'DT',
            filter: true,
            minWidth: 120,
            maxWidth: 150,
            editable: false
        },
        {
            headerName: 'Sablon neve',
            field: 'TestTemplatesName',
            filter: true,
            minWidth: 300,
            editable: false
        },
        {
            headerName: 'Sportoló',
            field: 'PersonName',
            filter: true,
            minWidth: 200,
            editable: false
        },
        {
            headerName: 'Képesség',
            field: 'SportAbilityName',
            filter: true,
            minWidth: 200,
            editable: false
        },
        {
            headerName: 'Gyakorlat',
            field: 'ExerciseName',
            filter: true,
            minWidth: 200,
            editable: false
        },
        {
            headerName: 'Eredmény típus',
            field: 'ResultTypeDescription',
            filter: true,
            minWidth: 200,
            editable: false
        },
        {
            headerName: 'Eredmény',
            field: 'RESULT',
            filter: true,
            minWidth: 100,
            editable: false
        },
        {
            headerName: 'Egység',
            field: 'UnitName',
            filter: true,
            minWidth: 60,
            editable: false
        },
    ]);
    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true,
        resizable: true,
    }));

    const getRowId = useCallback(function (params) {
        return params.data.TLID;
    }, []);


    useEffect(() => {
        setDataLoadingState('NOT PREPARED');
        setGridColumns(
            statParams.selectedColumns.map((columnName) => {
                const columnDef = statParams.columns.find(
                    (column) => column.field === columnName,
                );
                return {
                    field: columnName,
                    type: columnDef.type,
                    width: columnDef.width,
                    options: columnDef.options,
                };
            }),
        );

        setDataLoadingState('NOT LOADED');
    }, []);

    useEffect(() => {
        // eslint-disable-next-line no-use-before-define
        showDataIfNotCollapsed();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.language]);

    function showDataIfNotCollapsed() {
        if (accordionData.current) {
            if (!accordionData.current.classList.contains('collapsed')) {
                // eslint-disable-next-line no-use-before-define
                showData();
            }
        }
    }

    function getFilter() {
        const filterFields = Array.from(document.querySelectorAll('.reportFilter'))
            .filter((e) => e.value)
            .map((e) => {
                switch (e.type) {
                    case 'date':
                        const dateValue = new Date(e.value);
                        const sqlDate = `CONVERT(DATETIME, '${dateValue.getFullYear()}-${dateValue.getMonth() + 1
                            }-${dateValue.getDate()}', 102)`;
                        const sqlDate2359 = `CONVERT(DATETIME, '${dateValue.getFullYear()}-${dateValue.getMonth() + 1
                            }-${dateValue.getDate()} 23:59:59', 102)`;

                        let result = e.dataset.sql.replace(/\?\(2359\)/g, sqlDate2359);
                        result = result.replace(/\?/g, sqlDate);

                        return result;

                    default:
                        return `(${e.dataset.sql.replace(/\?/g, e.value)})`;
                }
            });
        return filterFields.join(' AND ');
    }

    function showData() {
        setDataLoadingState('LOADING');
        fetch(`${DataURL}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            token: props.loginData.token,
            headers: {
                'Content-Type': 'application/json',
                language: props.language,
                select: statParams.selectedColumns,
                top: statParams.top,
                from: statParams.sqlFrom,
                where: getFilter(),
                groupby: statParams.groupBy,
                orderby: statParams.orderBy,
                token: props.loginData.token,
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
                setRowData(jsonData.data);
                setDataLoadingState('LOADED');
            })
            .catch(() => {
                setDataLoadingState('NOT LOADED');
            });
    }


    return (
        <div className='page-statistics'>
            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseOne"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseOne"
                        >
                            Adatok szűrése
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body">
                            <Filters
                                reportParams={statParams}
                                languageElements={languageElements}
                                language={props.language}
                            />
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                        <button
                            ref={accordionData}
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseTwo"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseTwo"
                            onClick={() => showDataIfNotCollapsed()}
                        >
                            Adatok
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                        <div className="accordion-body">
                            <ExcelExport data={rowData} />
                            <strong>
                                <div className="ag-theme-alpine-dark" style={{ width: '100%', height: 600 }}>
                                    <AgGridReact ref={gridRef}
                                        rowData={rowData}
                                        columnDefs={columnDefs}
                                        getRowId={getRowId}
                                        defaultColDef={defaultColDef}
                                        editType={'fullRow'}
                                        rowSelection='multiple'>
                                    </AgGridReact>
                                </div>
                            </strong>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            Statisztikák
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                        <div className="accordion-body">
                            <Chart01 data={rowData}></Chart01>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageStatistics;