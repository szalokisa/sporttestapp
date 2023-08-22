import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import openRenderer from '../../components/renderers/openRenderer';
import axios from 'axios';

const SportAbilitiesURL = `${process.env.REACT_APP_API_BASE_URL}/sportabilities`;
const DeleteRecordURL = `${process.env.REACT_APP_API_BASE_URL}/deleterec`;

export default function SportabilitiesGrid(props) {
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
            field: 'SportAbilityName',
            cellEditor: 'agTextCellEditor',
            cellEditorPopup: false,
            filter: true,
            minWidth: 200,
            editable: true
        },
        {
            headerName: 'Leírás',
            field: 'Remark',
            cellEditor: 'agLargeTextCellEditor',
            cellEditorPopup: true,
            filter: true,
            minWidth: 750,
            editable: true
        },
    ]);

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true
    }));

    function _FnRefreshGrid() {
        ShowData();
    }

    useEffect(() => {
        ShowData();
    }, []);

    // const navigateToNextCell = useCallback((params) => {
    //     var suggestedNextCell = params.nextCellPosition;
    //     var KEY_UP = 'ArrowUp';
    //     var KEY_DOWN = 'ArrowDown';
    //     var noUpOrDownKeyPressed = params.key !== KEY_DOWN && params.key !== KEY_UP;
    //     if (noUpOrDownKeyPressed || !suggestedNextCell) {
    //         return suggestedNextCell;
    //     }
    //     gridRef.current.api.forEachNode(function (node) {
    //         if (node.rowIndex === suggestedNextCell.rowIndex) {
    //             node.setSelected(true);
    //         }
    //     });
    //     return suggestedNextCell;
    // }, []);

    const onCellValueChanged = useCallback((event) => {
        SaveData(event.data);
    }, []);

    async function SaveData(saveprops) {
        let recID = 0;
        if (saveprops.ID) { recID = saveprops.ID }
        axios.put(SportAbilitiesURL, {
            headers: {
                'Content-Type': 'application/json',
                ID: recID,
                SportAbilityName: saveprops.SportAbilityName,
                Remark: saveprops.Remark,
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
            SportAbilityName: "-",
            Remark: "-",
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
            headers: { data: deletedIds, datatable: "SportAbilities" }
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
                select: 'ID, SportAbilityName, Remark',
                top: '500',
                from: 'vSportAbilities',
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
                console.log('SportAbilitiesGrid.js (line: 207)', err);
            });
    }

    return (<div className="SportAbilitiesGrid">
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
            <div className="ag-theme-alpine-dark" style={{ width: 1000, height: 400 }}>
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
        </div>
    </div>)
}