import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import openRenderer from '../../components/renderers/openRenderer';
import saveRenderer from '../../components/renderers/saveRenderer'
import axios from 'axios';

const DataURL = `${process.env.REACT_APP_API_BASE_URL}/data`;
const DeleteRecordURL = `${process.env.REACT_APP_API_BASE_URL}/deleterec`;
const rowheight = 75;

export default function TestGrid(props) {
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

    const getRowId = useCallback(function (params) {
        return params.data.ID;
    }, []);

    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'ID',
            hide: true
        },
        {
            field: 'DT',
            headerName: 'Időpont',
            cellEditor: 'agTextCellEditor',
            cellEditorPopup: false,
            filter: true,
            editable: true
        },
        {
            field: 'PLACE',
            headerName: 'Helyszín',
            cellEditor: 'agTextCellEditor',
            width: 150,
            cellEditorPopup: false,
            wrapText: true,
            autoHeight: true,
            filter: true,
            editable: true
        },
        {
            field: 'TestTemplatesName',
            headerName: 'Teszt sablon',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: props.testTemplatesComboData.data
            },
            cellEditorPopup: false,
            filter: true,
            editable: true
        },
        {
            field: 'TestTemplatesDescription',
            headerName: 'Sablon leírás',
            width: 350,
            wrapText: true,
            autoHeight: true,
            filter: true,
            editable: false,
            hide: true,
        },
        {
            field: 'Persons_Count',
            headerName: 'Sportolók',
            cellEditor: 'agTextCellEditor',
            width: 100,
            cellEditorPopup: false,
            wrapText: true,
            autoHeight: true,
            filter: false,
            editable: false
        },
        {
            field: 'btnopen',
            width: 70,
            headerName: '-->',
            resizable: false,
            cellRenderer: openRenderer,
            cellRendererParams: {
                form: 'Child1',
                setView: props.setView
            }
        },
        {
            field: 'Tests_Count',
            headerName: 'Mérések',
            cellEditor: 'agTextCellEditor',
            width: 100,
            cellEditorPopup: false,
            wrapText: true,
            autoHeight: true,
            filter: false,
            editable: false
        },
        {
            field: 'btnopen2',
            width: 70,
            headerName: '-->',
            resizable: false,
            cellRenderer: openRenderer,
            cellRendererParams: {
                form: 'Child2',
                setView: props.setView
            }
        },
        {
            field: 'FillingPercent',
            headerName: ' % ',
            cellEditor: 'agTextCellEditor',
            width: 100,
            cellEditorPopup: false,
            wrapText: true,
            autoHeight: true,
            filter: false,
            editable: false
        },
        {
            field: 'REMARK',
            headerName: 'Megjegyzés',
            width: 200,
            wrapText: true,
            autoHeight: true,
            filter: true,
            editable: true
        },
        {
            field: 'btsave',
            width: 70,
            headerName: 'save',
            cellRenderer: saveRenderer,
        },
    ]);

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true,
        resizable: true,
    }));

    const cellClickedListener = useCallback(event => {
        props.biRef.HeadGridShowDataChildFromParent({ myID: event.data.ID });
        props.biRef.HeadGridSetParentID({ myID: event.data.ID });
        // props.biRef.HeadGridSetParentName({ myName: event.data.TestName });
        if (event.colDef.field === 'btsave') {
            SaveData(event.data);
        }
    }, []);

    function _FnRefreshGrid() {
        ShowData();
    }

    props.biRef.childGridClosed = _FnRefreshGrid;

    useEffect(() => {
        ShowData();
    }, []);

    const onCellValueChanged = useCallback((event) => {
        // SaveData(event.data);
    }, []);

    async function SaveData(saveprops) {
        let recID = 0;
        if (saveprops.ID) { recID = saveprops.ID }
        axios.put(DataURL, {
            headers: {
                'Content-Type': 'application/json',
                ID: recID,
                Data: saveprops,
                Identifier: 'STT_HEAD',
                token: props.token,
            }
        })
            .then((result) => {
                ShowData();
                return;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function createNewRowData() {
        const newData = {
            ID: 0,
            DT: "",
            PLACE: "---",
            REMARK: "---",
            TestTemplatesName: "---",
            TestTemplatesDescription: "---",
            Persons_Count: "0",
            Tests_Count: "0",
            FillingPercent: "0",
        };
        return newData;
    }

    function addItem() {
        const newItems = [
            createNewRowData(),
        ];
        const res = gridRef.current.api.applyTransaction({
            add: newItems,
            addIndex: 0,
        });
        return res;
    };

    function delRow1() {
        props.setView("trash1")
    }

    function delRow2() {
        const selectedData = gridRef.current.api.getSelectedRows();
        const deletedIds = JSON.stringify(selectedData.map(({ ID }) => ({ ID })));
        axios.delete(DeleteRecordURL, {
            headers: { data: deletedIds, datatable: "Test" }
        }).then(() => {
            ShowData()
        }).catch((err) => {
            console.error(err);
        })

        props.setView("HEAD")
    }

    function delRowCancel() {
        props.setView("HEAD")
    }

    function ShowData() {
        fetch(`${props.dataEndpoint}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            token: props.token,
            headers: {
                'Content-Type': 'application/json',
                language: props.language,
                select: 'ID, DT, PLACE, REMARK, TestTemplatesName, TestTemplatesDescription, Persons_Count, Tests_Count, FillingPercent',
                top: '500',
                from: 'vTest',
                where: '',
                groupby: '',
                orderby: 'ID DESC',
                token: props.token,
            },
        })
            .then((data) => {
                if (data.status !== 200) {
                    const error = new Error('invalid');
                    error.status = data.status;
                    throw error;
                }
                return data.json();
            })
            .then((jsonData) => {
                setRowData(jsonData.data);
            })
            .catch((err) => {
                console.log('TestGrid.js (line: 207)', err);
            });
    }

    return (<div className="TestGrid">
        <div class='row'>
            <div class="col-md-4">
                <button type='button' className='btn btn-secondary' onClick={() => addItem(undefined)}>Új adat</button>
            </div>
            <div class="col-md-4">
                <div className={`formbtndel1 ${props.view}`}>
                    <button type='button' className='btn btn-warning' onClick={delRow1}>Kijelöltek törlése</button>
                </div>
                <div className={`formbtncancel ${props.view}`}>
                    <button button type='button' className='btn btn-secondary' onClick={delRowCancel}>Mégsem</button>
                </div>
            </div>
            <div class="col-md-4">
                <div className={`formbtndel2 ${props.view}`}>
                    <button button type='button' className='btn btn-danger' onClick={delRow2}>Törlés megerősítése</button>
                </div>
            </div>
        </div>
        <div class="row">
            <div className="ag-theme-alpine-dark" style={{ width: '100%', height: 300 }}>
                <AgGridReact ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    getRowId={getRowId}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                    onCellValueChanged={onCellValueChanged}
                    onCellClicked={cellClickedListener}
                    rowSelection='multiple'>
                </AgGridReact>
            </div>
        </div>
    </div>)
}