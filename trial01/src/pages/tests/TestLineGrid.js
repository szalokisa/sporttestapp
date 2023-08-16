import React, { useState, useRef, useEffect, useMemo, useCallback, Component } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import axios from 'axios';
import saveRenderer from '../../components/renderers/saveRenderer'
// import { setSelectionRange } from '@testing-library/user-event/dist/utils';

const TestLinesURL = `${process.env.REACT_APP_API_BASE_URL}/data`;
const DeleteRecordURL = `${process.env.REACT_APP_API_BASE_URL}/deleterec`;
const SttLinesToHeadURL = `${process.env.REACT_APP_API_BASE_URL}/sttlinestohead`;

export default function TestLinesGrid(props) {
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
            field: 'STT_HEAD_ID',
            hide: true,
        },
        {
            field: 'PersonName',
            headerName: 'Sportoló',
            filter: true,
            editable: false
        },
        {
            field: 'SportAbilityName',
            headerName: 'Képesség',
            filter: true,
            editable: false
        },
        {
            field: 'ExerciseName',
            headerName: 'Gyakorlat',
            filter: true,
            editable: false
        },
        {
            field: 'ResultTypeDescription',
            headerName: 'Mit mérünk',
            filter: true,
            editable: false
        },
        {
            field: 'RESULT',
            headerName: 'Mért eredmény',
            cellEditor: 'agTextCellEditor',
            cellEditorPopup: false,
            filter: true,
            editable: true
        },
        {
            field: 'UnitName',
            headerName: 'egység',
            filter: true,
            editable: false
        },
        {
            field: 'REMARK',
            headerName: 'Megjegyzés',
            cellEditor: 'agTextCellEditor',
            cellEditorPopup: false,
            filter: true,
            editable: true
        },
        // {
        //     field: 'btaddlines',
        //     width: 70,
        //     resizable: false,
        //     headerName: 'save',
        //     cellRenderer: saveRenderer,
        // },
    ]);

    const defaultColDef = useMemo(() => ({
        sortable: true,
        resizable: true
    }));

    function addItem() {
        AddLines();
    };

    function createNewRowData() {
        const newData = {
            ID: 0,
            STT_HEAD_ID: 0,
            PersonName: '---',
            SportAbilityName: '---',
            ExerciseName: '---',
            ResultTypeDescription: '---',
            RESULT: '---',
            UnitName: '---',
            REMARK: '---',
        };
        return newData;
    }

    props.biRef.child2ShowDataChild = ShowDataChild;
    props.biRef.child2SetParID = SetParID;
    // props.biRef.childSetParName = SetParName;

    function SetParID(pr) {
        setParentID(pr.myID)
    }

    // function SetParName(pr) {
    //     setParentName(pr.myName)
    // }

    function closeMe() {
        props.setView("HEAD");
        props.childGridClosed();
        props.setRefreshId(currentRefreshId => (currentRefreshId + 1));
    }

    function ShowDataChild(pr) {
        let mywhere = `STT_HEAD_ID = ${pr.myID}`;
        fetch(`${props.dataEndpoint}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            token: props.token,
            headers: {
                'Content-Type': 'application/json',
                language: props.language,
                select: 'ID, STT_HEAD_ID, PersonName, SportAbilityName, ExerciseName, ResultTypeDescription, RESULT, UnitName, REMARK',
                top: '500',
                from: 'vTestLines',
                where: mywhere,
                groupby: '',
                orderby: 'PersonName',
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
                console.log('TestLinesGrid.js (line: 173)', err);
            });
    }

    const onCellValueChanged = useCallback((event) => {
        SaveData(event.data);
    }, []);

    async function SaveData(saveprops) {
        let recID = 0;
        if (saveprops.ID) { recID = saveprops.ID };
        saveprops['STT_HEAD_ID'] = pID.current;
        axios.put(TestLinesURL, {
            headers: {
                'Content-Type': 'application/json',
                ID: recID,
                Data: saveprops,
                HeadID: parentID,
                Identifier: 'STT_LINES',
                token: props.token,
            }
        })
            .then((result) => {
                let pr = { myID: result.data.data[0].STT_HEAD_ID };
                ShowDataChild(pr);
                return;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    async function AddLines() {
        axios.put(SttLinesToHeadURL, {
            header: {
                'Content-Type': 'application/json',
                HeadID: parentID,
                token: props.token,
            }
        })
            .then((result) => {
                let pr = { myID: result.data.data[0].STT_HEAD_ID };
                ShowDataChild(pr);
                return;
            })
            .catch((err) => {
                console.log('TestLineGrid.js (line: 211)', err);
                console.error(err);
            });
    }

    // const cellClickedListener = useCallback(event => {
    //     if (event.colDef.field === 'btaddlines') {
    //         AddLines(event.data);
    //     }
    // }, []);

    function delRow1() {
        props.setView("child2trash1")
    }

    function delRow2() {
        const selectedData = gridRef.current.api.getSelectedRows();
        const deletedIds = JSON.stringify(selectedData.map(({ ID }) => ({ ID })));
        axios.delete(DeleteRecordURL, {
            headers: { data: deletedIds, datatable: "STT_LINES" }
        }).then(() => {
            let pr = { myID: parentID };
            ShowDataChild(pr)
        }).catch((err) => {
            console.error(err);
        })
        props.setView("CHILD2")
    }

    function delRowCancel() {
        props.setView("CHILD2")
    }

    return (<div className="TestLinesGrid">
        <h2>Mért eredmények / {parentID} </h2>
        <div className='row'>
            <div class="col-md-4">
                <button type='button' className='btn btn-secondary' onClick={() => addItem(undefined)}>Mérési adatok felvétele</button>
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
        <div className="ag-theme-alpine-dark" style={{ width: '100%', height: 400 }}>
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