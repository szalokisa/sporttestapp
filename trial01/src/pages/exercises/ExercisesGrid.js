import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import saveRenderer from '../../components/renderers/saveRenderer';
import deleteRenderer from '../../components/renderers/deleteRenderer';
import openRenderer from '../../components/renderers/openRenderer';
import axios from 'axios';

const ExercisesURL = `${process.env.REACT_APP_API_BASE_URL}/exercises`;

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
            filter: true,
            editable: true
        },
        {
            headerName: 'Leírás',
            field: 'ExerciseDescription',
            cellEditor: 'agLargeTextCellEditor',
            cellEditorPopup: true,
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
                values: props.sportAbilitiesComboData.data
            },
            filter: true,
            editable: true
        },
        {
            headerName: 'Várt eredmények',
            minWidth: 150,
            field: 'ResToExString',
            filter: false,
            editable: false
        },
        {
            field: 'btnopen',
            headerName: 'Várt eredmények szerkesztése',
            cellRenderer: openRenderer,
            cellRendererParams: {
                form: 'Exercises',
                setView: props.setView
            }
        },
        {
            field: 'btndelete',
            headerName: 'Törlés',
            cellRenderer: deleteRenderer
        },
    ]);

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true
    }));

    // // Example of consuming Grid Event
    const cellClickedListener = useCallback(event => {
        props.biRef.ExerciseGridShowDataChildFromParent({ myID: event.data.ID });
        props.biRef.ExerciseGridSetParentID({ myID: event.data.ID });

        // props.setCurrentExerciseId(event.data.ID);
    }, []);

    useEffect(() => {
        ShowData();
    }, []);

    const navigateToNextCell = useCallback((params) => {
        var suggestedNextCell = params.nextCellPosition;
        var KEY_UP = 'ArrowUp';
        var KEY_DOWN = 'ArrowDown';
        var noUpOrDownKeyPressed = params.key !== KEY_DOWN && params.key !== KEY_UP;
        if (noUpOrDownKeyPressed || !suggestedNextCell) {
            return suggestedNextCell;
        }
        gridRef.current.api.forEachNode(function (node) {
            if (node.rowIndex === suggestedNextCell.rowIndex) {
                node.setSelected(true);
            }
        });
        return suggestedNextCell;
    }, []);

    const onCellValueChanged = useCallback((event) => {
        SaveData(event.data);
    }, []);

    async function SaveData(saveprops) {
        let recID = 0;
        if (saveprops.ID) { recID = saveprops.ID }
        axios.put(ExercisesURL, {
            headers: {
                'Content-Type': 'application/json',
                ID: recID,
                ExerciseName: saveprops.ExerciseName,
                ExerciseDescription: saveprops.ExerciseDescription,
                SportAbilityName: saveprops.SportAbilityName,
            }
        })
            .then((result) => {
                return;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function createNewRowData() {
        const newData = {
            ID: 0,
            ExerciseName: "-",
            ExerciseDescription: "-",
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

    function ShowData() {
        fetch(`${props.dataEndpoint}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            token: props.token,
            headers: {
                'Content-Type': 'application/json',
                language: props.language,
                select: 'ID, ExerciseName, ExerciseDescription, SportAbilityName, ResToExString',
                top: '500',
                from: 'vExercises',
                where: '',
                groupby: '',
                orderby: 'ExerciseName',
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
                console.log('+++ ExercisesGrid.js (line: 71)', err);
            });
    }

    return (<div className="ExercisesGrid">
        <div className='btn-area'>
            <button type='button' className='btn btn-secondary' onClick={() => addItem(undefined)}>Új adat</button>
        </div>
        <div className="ag-theme-alpine-dark" style={{ width: 1100, height: 300 }}>
            <AgGridReact ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                getRowId={getRowId}
                defaultColDef={defaultColDef}
                animateRows={true}
                onCellValueChanged={onCellValueChanged}
                navigateToNextCell={navigateToNextCell}
                onCellClicked={cellClickedListener}
                rowSelection='simple'>
            </AgGridReact>
        </div>
    </div>)
}

