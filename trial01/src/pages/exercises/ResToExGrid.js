import React, { useState, useRef, useEffect, useMemo, useCallback, Component } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import saveRenderer from '../../components/renderers/saveRenderer';
import deleteRenderer from '../../components/renderers/deleteRenderer';
import axios from 'axios';

const ResToExURL = `${process.env.REACT_APP_API_BASE_URL}/exercises/restoex`;

export default function ResToExGrid(props) {
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
    const [parentID, setParentID] = useState(0);
    const pID = useRef(0);

    const getRowId = useCallback(function (params) {
        return params.data.ID;
    }, []);

    useEffect(() => {
        pID.current = parentID;
    }, [parentID])

    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'ID',
            hide: true,
        },
        {
            headerName: 'Leírás',
            field: 'ResultTypeDescription',
            filter: true,
            editable: true
        },
        {
            field: 'UnitName',
            headerName: 'Mértékegység',
            cellEditor: 'agSelectCellEditor',
            editable: true,
            cellEditorParams: {
                values: props.unitComboData.data
            },

        },
        {
            field: 'btnsave',
            headerName: '...Adat mentése',
            cellRenderer: saveRenderer,
        },
        {
            field: 'btndelete',
            headerName: 'Adat törlése',
            cellRenderer: deleteRenderer
        },
    ]);

    const defaultColDef = useMemo(() => ({
        sortable: true
    }));

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

    function createNewRowData() {
        const newData = {
            ID: 0,
            ResultTypeDescription: "-",
            UnitName: "---",
        };
        return newData;
    }

    props.biRef.resToExShowDataChild = ShowDataChild;
    props.biRef.resToExSetParID = SetParID;

    function SetParID(pr) {
        setParentID(pr.myID)
    }

    function closeMe() {
        props.setView("HEAD");
        props.exGridClosed();
        props.setRefreshId(currentRefreshId => (currentRefreshId + 1));
    }

    function ShowDataChild(pr) {
        let mywhere = `ExerciseID = ${pr.myID}`;

        fetch(`${props.dataEndpoint}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            token: props.token,
            headers: {
                'Content-Type': 'application/json',
                language: props.language,
                select: 'ID, ResultTypeDescription, UnitName, ExerciseName',
                top: '500',
                from: 'vResToEx',
                where: mywhere,
                groupby: '',
                orderby: 'ID',
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

    async function SaveData(saveprops) {
        let recID = 0;
        if (saveprops.ID) { recID = saveprops.ID };

        axios.put(ResToExURL, {
            headers: {
                'Content-Type': 'application/json',
                ID: recID,
                ExerciseName: saveprops.ExerciseName,
                ResultTypeDescription: saveprops.ResultTypeDescription,
                UnitName: saveprops.UnitName,
                ExerciseID: saveprops.ExerciseID,
            }
        })
            .then((result) => {
                return;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const onCellValueChanged = useCallback((event) => {
        let dataJson;
        try {
            let dataJsonStr = JSON.stringify(event.data);
            dataJson = JSON.parse(dataJsonStr);
            dataJson['ExerciseID'] = pID.current;
        }
        catch (err) {
            console.log('+++ ResToExGrid.js (line: 153)', err);
        }
        SaveData(dataJson);
    }, []);

    return (<div className="ResToExGrid">
        <h2>Várt eredmények {parentID} </h2>
        <div className='btn-area'>
            <button type='button' className='btn btn-secondary' onClick={() => addItem(undefined)}>Új adat</button>
            <button type='button' className='btn btn-secondary' onClick={closeMe}>
                Bezár
            </button>
        </div>
        <div className="ag-theme-alpine-dark" style={{ width: 900, height: 300 }}>
            <AgGridReact ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                getRowId={getRowId}
                defaultColDef={defaultColDef}
                animateRows={true}
                onCellValueChanged={onCellValueChanged}
                rowSelection='simple'>
            </AgGridReact>
        </div>

    </div>)
}