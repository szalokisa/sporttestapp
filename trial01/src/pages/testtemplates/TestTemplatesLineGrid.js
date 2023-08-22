import React, { useState, useRef, useEffect, useMemo, useCallback, Component } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import axios from 'axios';
import saveRenderer from '../../components/renderers/saveRenderer'
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

const TestTemplatesLineURL = `${process.env.REACT_APP_API_BASE_URL}/data`;
const DeleteRecordURL = `${process.env.REACT_APP_API_BASE_URL}/deleterec`;

export default function TestTemplatesLineGrid(props) {
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
    const [parentID, setParentID] = useState(0);
    const [parentName, setParentName] = useState(0);
    const pID = useRef(0);
    // const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);

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
            field: 'Test_Template_ID',
            hide: true,
        },
        {
            field: 'ExerciseName',
            headerName: 'Gyakorlat megnevezése',
            cellEditor: 'agSelectCellEditor',
            wrapText: true,
            cellEditorParams: {
                values: props.exercisesComboData.data
            },
            filter: true,
            editable: true
        },
        {
            field: 'ExerciseDescription',
            wrapText: true,
            autoHeight: true,
            headerName: 'Leírás',
            width: 300,
            editable: false,
        },
        {
            field: 'SportAbilityName',
            headerName: 'Képesség',
            wrapText: true,
            editable: false,
        },
        {
            field: 'btsave',
            width: 70,
            resizable: false,
            headerName: 'save',
            cellRenderer: saveRenderer,
        },
    ]);

    const defaultColDef = useMemo(() => ({
        sortable: true,
        resizable: true
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
            ExerciseName: "---",
            ExerciseDescription: "-",
            SportAbilityName: "-",
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
        let mywhere = `Test_Template_ID = ${pr.myID}`;
        fetch(`${props.dataEndpoint}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            token: props.token,
            headers: {
                'Content-Type': 'application/json',
                language: props.language,
                select: 'ID, Test_Template_ID, ExerciseName, ExerciseDescription, SportAbilityName',
                top: '500',
                from: 'vTestTemplatesLine',
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
                console.log('TestTemplatesLineGrid.js (line: 145)', err);
            });
    }

    async function SaveData(saveprops) {
        let recID = 0;
        if (saveprops.ID) { recID = saveprops.ID };
        saveprops['Test_Template_ID'] = pID.current;
        axios.put(TestTemplatesLineURL, {
            headers: {
                'Content-Type': 'application/json',
                ID: recID,
                Data: saveprops,
                HeadID: parentID,
                Identifier: 'TestTemplatesLine',
                token: props.token,
            }
        })
            .then((result) => {
                let pr = { myID: result.data.data[0].Test_Template_ID };
                ShowDataChild(pr);
                return;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const cellClickedListener = useCallback(event => {
        if (event.colDef.field === 'btsave') {
            SaveData(event.data);
        }
    }, []);

    const onCellValueChanged = useCallback((event) => {
        // ellenorzesek
    }, []);

    function delRow1() {
        props.setView("childtrash1")
    }

    function delRow2() {
        const selectedData = gridRef.current.api.getSelectedRows();
        const deletedIds = JSON.stringify(selectedData.map(({ ID }) => ({ ID })));
        axios.delete(DeleteRecordURL, {
            headers: { data: deletedIds, datatable: "TestTemplatesLine" }
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

    return (<div className="TestTemplatesLineGrid">
        <h2>Sablon gyakorlatai / {parentName} </h2>
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

    </div>)
}