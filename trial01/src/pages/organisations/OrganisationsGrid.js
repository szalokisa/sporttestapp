import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import axios from 'axios';
import { validators } from '../../components/validators/validators';
import saveRenderer from '../../components/renderers/saveRenderer'

const DataURL = `${process.env.REACT_APP_API_BASE_URL}/data`;
const DeleteRecordURL = `${process.env.REACT_APP_API_BASE_URL}/deleterec`;

export default function OrganisationsGrid(props) {
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
            headerName: 'Név',
            field: 'OrganisationName',
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
            minWidth: 350,
            editable: true,
        },
        {
            headerName: 'Email',
            field: 'EmailAddress',
            cellEditor: 'agTextCellEditor',
            cellEditorPopup: false,
            cellStyle: params => {
                const invalid = validators.validate('validEmail', params.value, props.language)
                if (invalid) {
                    return { backgroundColor: '#6e100a' };
                }
                return null;
            },
            minWidth: 500,
            filter: true,
            editable: true,
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

    useEffect(() => {
        ShowData();
    }, []);

    const onRowValueChanged = useCallback((event) => {
        props.setView("HEAD")
        SaveData(event.data);
    }, []);

    const onRowEditingStarted = useCallback((event) => {
        props.setView("EDITING")
    }, []);

    const onRowEditingStopped = useCallback((event) => {
        props.setView("HEAD")
    }, []);

    async function SaveData(saveprops) {
        let recID = 0;
        if (saveprops.ID) { recID = saveprops.ID }
        axios.put(DataURL, {
            token: props.loginData.token,
            headers: {
                'Content-Type': 'application/json',
                ID: recID,
                Data: saveprops,
                Identifier: 'Organisations',
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

    function stopEditing() {
        gridRef.current.api.stopEditing();
    }

    const cellClickedListener = useCallback(event => {
        if (event.colDef.field === 'btsave') {
            stopEditing();
        }
    }, []);

    function createNewRowData() {
        const newData = {
            ID: 0,
            OrganisationName: "",
            EmailAddress: "",
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
            headers: { data: deletedIds, datatable: "Organisations" }
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
                select: 'ID, OrganisationName, EmailAddress',
                top: '500',
                from: 'vOrganisations',
                where: '',
                groupby: '',
                orderby: 'ID DESC',
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
                console.log('OrganisationsGrid.js (line: 207)', err);
            });
    }

    return (<div className="OrganisationsGrid">
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
            <div className="ag-theme-alpine-dark" style={{ width: '100%', height: 300 }}>
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