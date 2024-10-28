import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import openRenderer from '../../components/renderers/openRenderer';
import saveRenderer from '../../components/renderers/saveRenderer'
import axios from 'axios';
import { validators } from '../../components/validators/validators';

const DataURL = `${process.env.REACT_APP_API_BASE_URL}/data`;
const DeleteRecordURL = `${process.env.REACT_APP_API_BASE_URL}/deleterec`;

export default function ExercisesGrid(props) {
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
            headerName: 'Megnevezés',
            field: 'ExerciseName',
            cellEditor: 'agTextCellEditor',
            cellEditorPopup: false,
            cellStyle: params => {
                const invalid = validators.validate('required', params.value, props.language)
                if (invalid) {
                    return { backgroundColor: '#6e100a' };
                }
                return null;
            },
            filter: true,
            editable: true
        },
        {
            headerName: 'Leírás',
            field: 'ExerciseDescription',
            cellEditor: 'agTextCellEditor',
            cellEditorPopup: false,
            filter: true,
            editable: true
        },
        {
            headerName: 'Képesség/típus',
            minWidth: 100,
            field: 'SportAbilityName',
            cellEditorPopup: false,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: props.sportAbilitiesComboData
            },
            cellStyle: params => {
                const invalid = validators.validate('required', params.value, props.language)
                if (invalid) {
                    return { backgroundColor: '#6e100a' };
                }
                return null;
            },
            filter: true,
            editable: true
        },
        {
            headerName: 'Várt eredmények',
            minWidth: 250,
            field: 'ResToExString',
            filter: false,
            editable: false
        },
        {
            field: 'btsave',
            width: 70,
            headerName: 'save',
            cellRenderer: saveRenderer,
        },
        {
            field: 'btnopen',
            width: 70,
            headerName: '...',
            cellRenderer: openRenderer,
            cellRendererParams: {
                form: 'Child1',
                setView: props.setView,
            }
        },
    ]);

    function stopEditing() {
        gridRef.current.api.stopEditing();
    }

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true,
        resizable: true,
    }));

    const cellClickedListener = useCallback(event => {
        if (event.colDef.field === 'btnopen') {
            stopEditing();
        }
        if (event.colDef.field === 'btsave') {
            stopEditing();
        };
        props.biRef.HeadGridShowDataChildFromParent({ myID: event.data.ID });
        props.biRef.HeadGridSetParentID({ myID: event.data.ID });
        props.biRef.HeadGridSetParentName({ myName: event.data.ExerciseName });
    }, []);

    function _FnRefreshGrid() {
        ShowData();
    }

    props.biRef.childGridClosed = _FnRefreshGrid;

    const onRowValueChanged = useCallback((event) => {
        props.setView("HEAD")
        SaveData(event.data);
    }, []);
    
    const onRowEditingStarted = useCallback((event) => {
        props.setView("EDITING")
    }, []);
    
    useEffect(() => {
        ShowData();
    }, []);

    const onRowEditingStopped = useCallback((event) => {
        props.setView("HEAD")
    }, []);

    async function SaveData(saveprops) {
        let recID = 0;
        if (saveprops.ID) { recID = saveprops.ID }
        axios.put(DataURL, {
            headers: {
                'Content-Type': 'application/json',
                ID: recID,
                Data: saveprops,
                Identifier: 'Exercises',
                token: props.loginData.token,
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
            ExerciseName: "",
            ExerciseDescription: "",
            SportAbilityName: "---",
            ResToExString: "",
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
            headers: { data: deletedIds, datatable: "Exercises" }
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
            token: props.loginData.token,
            headers: {
                'Content-Type': 'application/json',
                language: props.language,
                select: 'ID, ExerciseName, ExerciseDescription, SportAbilityName, ResToExString',
                top: '500',
                from: 'vExercises',
                where: '',
                groupby: '',
                orderby: 'ID desc',
                token: props.loginData.token,
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
                console.log('ExercisesGrid.js (line: 207)', err);
            });
    }

    return (<div className="ExercisesGrid">
        <div className='row'>
            <div className="col-md-4">
                <div className={`formbtnnew ${props.view}`}>
                    <button type='button' className='btn btn-secondary' onClick={() => addItem(undefined)}>Új adat</button>
                </div>
                <div className={`formbtnnewplaceholder ${props.view}`}>
                    <button type='button'
                        className='btn btn-secondary'
                        disabled={true}
                        onClick={() => addItem(undefined)}>Új adat</button>
                </div>
            </div>
            <div className="col-md-4">
                <div className={`formbtndel1 ${props.view}`}>
                    <button type='button' className='btn btn-warning' onClick={delRow1}>Kijelöltek törlése</button>
                </div>
                <div className={`formbtncancel ${props.view}`}>
                    <button button type='button' className='btn btn-secondary' onClick={delRowCancel}>Mégsem</button>
                </div>
            </div>
            <div className="col-md-4">
                <div className={`formbtndel2 ${props.view}`}>
                    <button button type='button' className='btn btn-danger' onClick={delRow2}>Törlés megerősítése</button>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="ag-theme-alpine-dark" style={{ width: '100%', height: 500 }}>
                <AgGridReact ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    getRowId={getRowId}
                    defaultColDef={defaultColDef}
                    editType={'fullRow'}
                    onRowValueChanged={onRowValueChanged}
                    onRowEditingStarted={onRowEditingStarted}
                    onRowEditingStopped={onRowEditingStopped}
                    onCellClicked={cellClickedListener}
                    rowSelection='multiple'>
                </AgGridReact>
            </div>
        </div>
    </div>)
}