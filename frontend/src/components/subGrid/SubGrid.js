import { useState, useEffect, useRef } from 'react';
import LanguageElementsHandler from "../../repository/LanguageElementsHandler";
import DataGrid from '../dataGrid/DataGrid2';
import RefreshIcon from './reload.svg';
import PlusIcon from './plus.svg';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './SubGrid.scss';

export default function SubGrid(props) {
    const languageElementsHandler = new LanguageElementsHandler(
        props.languageElements,
        props.language,
    );

    const [dataLoadingState, setDataLoadingState] = useState('SUB NOT PREPARED');
    const [gridData, setGridData] = useState([]);
    const [gridColumns, setGridColumns] = useState([]);
    useEffect(() => {
        setDataLoadingState('SUB NOT PREPARED');
        setGridColumns(
            props.reportParams.selectedColumns.map((columnName) => {
                const columnDef = props.reportParams.columns.find(
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
        setDataLoadingState('SUN NOT LOADED');
    }, []);

    useEffect(() => {
        showData();
    }, [props.language, props.refreshId || 0]);

    function addNew() {
        props.onAddNew();
    }

    function showData() {
        setDataLoadingState('SUB LOADING');
        fetch(`${props.dataEndpoint}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            token: props.token,
            headers: {
                'Content-Type': 'application/json',
                language: props.language,
                select: props.reportParams.selectedColumns,
                top: props.reportParams.top,
                from: props.reportParams.sqlFrom,
                where: '', //'itt kell majd head ID-re szűrni',
                groupby: props.reportParams.groupBy,
                orderby: props.reportParams.orderBy,
                token: props.token,
            },
        })
            .then((data) => {
                if (data.status !== 200) {
                    setDataLoadingState('SUB NOT LOADED');
                    const error = new Error('invalid');
                    error.status = data.status;
                    throw error;
                }
                return data.json();
            })
            .then((jsonData) => {
                setGridData(jsonData);
                console.log('+++ SubGrid.js (line: 83)', jsonData);
                setDataLoadingState('SUB LOADED');
            })
            .catch((err) => {
                console.log('+++ SubGrid.js (line: 87)', err);
                setDataLoadingState('SUB NOT LOADED');
            });
    }
    return (
        <div className="sub-grid">
            {dataLoadingState === 'SUB LOADING' && (
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}

            {dataLoadingState === 'SUB LOADED' && (
                <div className='subgrid-area'>
                    {/* {props.onAddNew && */}
                    <button type="button" className="btn btn-warning btn-add" onClick={addNew}>
                        <img className="Add-icon" src={PlusIcon} alt="Refresh-icon.svg" />
                    </button>
                    {/* } */}
                    <button type="button" className="btn btn-warning btn-refresh-report" onClick={showData}>
                        <img className="Refresh-icon" src={RefreshIcon} alt="Refresh-icon.svg" />
                    </button>
                    <div className='subgrid-grid'>
                        <DataGrid
                            id={`${props.id}-dataGrid`}
                            columns={gridColumns}
                            language={props.language}
                            languageElements={props.languageElements}
                            data={gridData}
                            frameworkComponents={props.frameWorkComponents}
                            cellRenderers={props.cellRenderers}
                            rowSelection={props.rowSelection}
                            rowMultiSelectWithClick={props.rowMultiSelectWithClick}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
