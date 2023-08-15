import React, { useState, useRef, useEffect, useMemo, useCallback, Component } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import axios from 'axios';

const ResToExURL = `${process.env.REACT_APP_API_BASE_URL}/exercises/restoex`;
const DeleteRecordURL = `${process.env.REACT_APP_API_BASE_URL}/deleterec`;

export default function ResToExGrid(props) {
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
    const [parentID, setParentID] = useState(0);
    const [parentName, setParentName] = useState(0);
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

    props.biRef.childShowDataChild = ShowDataChild;
    props.biRef.childSetParID = SetParID;
    props.biRef.childSetParName = SetParName;

    function SetParID(pr) {
        setParentID(pr.myID)
    }

    function SetParName(pr) {
        setParentName(pr.myName)
    }

    function closeMe() {
        props.setView("HEAD");
        props.childGridClosed();
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
                console.log('ResToExGrid.js (line: 121)', err);
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
            console.log('ResToExGrid.js (line: 153)', err);
        }
        SaveData(dataJson);
    }, []);

    function delRow1() {
        props.setView("childtrash1")
    }

    function delRow2() {
        const selectedData = gridRef.current.api.getSelectedRows();
        const deletedIds = JSON.stringify(selectedData.map(({ ID }) => ({ ID })));
        axios.delete(DeleteRecordURL, {
            headers: { data: deletedIds, datatable: "ResultsToExercises" }
        }).then(() => {
            let pr = { myID: parentID };
            ShowDataChild(pr)
        }).catch((err) => {
            console.error(err);
        })
        props.setView("CHILD")
    }

    function delRowCancel() {
        props.setView("CHILD")
    }

    return (<div className="ResToExGrid">
        <h2>Várt eredmények / {parentName} </h2>
        <div className='row'>
            <div class="col-md-4">
                <button type='button' className='btn btn-secondary' onClick={() => addItem(undefined)}>Új adat</button>
                <button type='button' className='btn btn-close' onClick={closeMe}></button>
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
        <div className="ag-theme-alpine-dark" style={{ width: 900, height: 300 }}>
            <AgGridReact ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                getRowId={getRowId}
                defaultColDef={defaultColDef}
                animateRows={true}
                onCellValueChanged={onCellValueChanged}
                rowSelection='multiple'>
            </AgGridReact>
        </div>

    </div>)
}