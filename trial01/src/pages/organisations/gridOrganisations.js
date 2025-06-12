import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { validators } from '../../components/validators/validators';
import saveRenderer from '../../components/renderers/saveRenderer';
import axios from 'axios';
import Ajv from 'ajv';
import addFormats from 'ajv-formats'
import GridComboData from '../../components/gridComboData';
import { comboDefOrganisations } from '../../components/gridcombodefs/gridComboDefOrganisations';
import "./gridOrganisations.scss";
const myAjv = new Ajv()
addFormats(myAjv)

const organisationsAjvSchema = {
    type: "object",
    properties: {
        ID: { type: "integer" },
        OrganisationName: { type: "string", minLength: 1 },
        EmailAddress: { type: "string", format: "email" }
    },
    required: ["OrganisationName", "EmailAddress"],
    additionalProperties: false,
}

const DataURL = `${process.env.REACT_APP_API_BASE_URL}/data`;

function GridOrganisations(props) {
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
    const comboOrganisationsProps = comboDefOrganisations;
    const [rowIndex, setRowIndex] = useState();
    comboOrganisationsProps.token = props.token;
    comboOrganisationsProps.language = props.language;

    const getRowId = useCallback(function (params) {
        return params.data.ID;
    }, []);

    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'ID',
            hide: true
        },
        {
            field: 'OrganisationName',
            headerName: 'Szervezet',
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
            field: 'EmailAddress',
            headerName: 'Email cím',
            cellEditor: 'agTextCellEditor',
            cellEditorPopup: false,
            cellStyle: params => {
                const invalid = validators.validate('validEmail', params.value, props.language)
                if (invalid) {
                    return { backgroundColor: '#6e100a' };
                }
                return null;
            },
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

    const defaultColDef = useMemo(() => ({
        sortable: true,
        resizable: true,
    }));

    useEffect(() => {
        ShowData();
    }, []);

    useEffect(() => {
        stateChangeHandling();
    }, [props.formState])

    const onRowValueChanged = useCallback(async (event) => {
        const valid = fieldValid(event.data)
        if (valid) {
            await SaveData(event.data)
        }
    }, []);

    async function handleCellClick(event) {
        setRowIndex(event.node.rowIndex);
        if (event.colDef.field === 'btsave') {
            stopEditing();
        }
    }

    const cellClickedListener = useCallback(
        async event => await handleCellClick(event, setRowIndex, rowIndex, stopEditing),
        [setRowIndex, rowIndex, stopEditing]
    );

    const onRowEditingStarted = useCallback((event) => {
        if (props.formState === 'HBASE') {
            props.setFormState('HEDIT')
        }
    }, []);

    function stopEditing() {
        gridRef.current.api.stopEditing();
    }

    async function stateChangeHandling() {
        switch (props.formState) {
            case 'HNEW':
                addItem();
                break;
            case 'CANCELNEW':
                await ShowData();
                props.setFormState("HBASE")
                break;
            case 'HDEL2':
                await delRow2();
                props.setFormState("HBASE")
                break;
            default:
        }
    }

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

    async function delRow2() {
        const selectedData = gridRef.current.api.getSelectedRows();
        const deletedIds = JSON.stringify(selectedData.map(({ ID }) => ({ ID })));
        axios.delete(DataURL, {
            headers: {
                data: deletedIds,
                token: props.token,
                collection: 'vOrganisations',
                userName: props.userName,
            },
        }).then(async (result) => {
            await ShowData()
            let comboData = await GridComboData(comboOrganisationsProps);
            props.setOrganisationsComboData(comboData);
            return;
        }).catch((err) => {
            console.error(err);
        })
    }

    function fieldValid(saveprops) {
        let result = true;
        const validate = myAjv.compile(organisationsAjvSchema);
        result = validate(saveprops)
        return result;
    }

    async function SaveData(saveprops) {
        let recID = 0;
        if (saveprops.ID) { recID = saveprops.ID }
        axios.put(DataURL, {
            'Content-Type': 'application/json',
            'token': props.token,
            'collection': 'vOrganisations',
            'userName': props.userName,
            'ID': recID,
            'Data': saveprops,
        })
            .then(async (result) => {
                await ShowData();
                let comboData = await GridComboData(comboOrganisationsProps);
                props.setOrganisationsComboData(comboData);
                props.setFormState("HBASE")
                return;
            })
            .catch((err) => {
                alert(err.response.data.message);
                console.error(err);
            });
    }

    async function ShowData() {
        fetch(`${DataURL}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            token: props.token,
            headers: {
                'Content-Type': 'application/json',
                language: props.language,
                'collection': 'vOrganisations',
                'token': props.token,
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
                console.log('PersonsGrid.js (line: 207)', err);
            });
    }

    return (
        <div className="gridpage">
            <div className="ag-theme-alpine-dark" style={{ width: '100%', height: '300pt' }}>
                <AgGridReact ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    getRowId={getRowId}
                    defaultColDef={defaultColDef}
                    editType={'fullRow'}
                    onRowValueChanged={onRowValueChanged}
                    onRowEditingStarted={onRowEditingStarted}
                    onCellClicked={cellClickedListener}
                    rowSelection='multiple'>
                </AgGridReact>
            </div>
        </div>
    )
}

export default GridOrganisations;