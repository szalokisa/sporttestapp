import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
// import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import openRenderer from '../../components/renderers/openRenderer';
import axios from 'axios';

const ExercisesURL = `${process.env.REACT_APP_API_BASE_URL}/exercises`;
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
            minWidth: 250,
            field: 'ResToExString',
            filter: false,
            editable: false
        },
        {
            field: 'btnopen',
            width: 70,
            headerName: '...',
            cellRenderer: openRenderer,
            cellRendererParams: {
                form: 'Exercises',
                setView: props.setView
            }
        },
    ]);

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true
    }));

    const cellClickedListener = useCallback(event => {
        props.biRef.ExerciseGridShowDataChildFromParent({ myID: event.data.ID });
        props.biRef.ExerciseGridSetParentID({ myID: event.data.ID });
    }, []);

    function _FnRefreshGrid() {
        ShowData();
    }

    props.biRef.exGridClosed = _FnRefreshGrid;

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
                console.log('+++ ExercisesGrid.js (line: 207)', err);
            });
    }

    return (<div className="ExercisesGrid">
        <div className='btnnew-area'>
            <button type='button' className='btn btn-secondary' onClick={() => addItem(undefined)}>Új adat</button>
        </div>
        <div className={`exercisebtndel1 ${props.view}`}>
            <button onClick={delRow1}>Kijelöltek törlése</button>
        </div>
        <div className={`exercisebtncancel ${props.view}`}>
            <button onClick={delRowCancel}>Mégsem</button>
        </div>
        <div className={`exercisebtndel2 ${props.view}`}>
            <button onClick={delRow2}>Törlés megerősítése</button>
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
                rowSelection='multiple'>
            </AgGridReact>
        </div>
    </div>)
}