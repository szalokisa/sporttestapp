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
import { comboDefPersons } from '../../components/gridcombodefs/gridComboDefPersons';
import "./gridPersons.scss";
const myAjv = new Ajv()
addFormats(myAjv)

const ajvSchema = {
    type: "object",
    properties: {
        ID: { type: "integer" },
        PersonName: { type: "string", minLength: 1 },
        EmailAddress: { type: "string", format: "email" },
        BirthDay: { type: "string", minLength: 10 },
        GenderName: { type: "string", minLength: 1 },
        OrganisationName: { type: "string", minLength: 1 },
    },
    required: [
        "PersonName",
        "EmailAddress",
    ],
    additionalProperties: false,
}

const DataURL = `${process.env.REACT_APP_API_BASE_URL}/data`;

function GridPersons(props) {
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
    const [rowIndex, setRowIndex] = useState();
    const comboPersonsProps = comboDefPersons;
    comboPersonsProps.token = props.token;
    comboPersonsProps.language = props.language;
    console.log('!!!SSS gridPersons.js (line: 42)', props.gendersComboData);
    const getRowId = useCallback(function (params) {
        return params.data.ID;
    }, []);

    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'ID',
            hide: true
        },
        {
            field: 'PersonName',
            headerName: 'Név',
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
            field: 'BirthDay',
            headerName: 'Születési dátum',
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
            field: 'GenderName',
            headerName: 'Nem',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: props.gendersComboData.data
            },
            cellEditorPopup: false,
            filter: true,
            editable: true
        },
        {
            field: 'OrganisationName',
            headerName: 'Szervezet',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: props.organisationsComboData.data
            },
            cellEditorPopup: false,
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
        console.log('!!!SSS gridPersons.js (line: 160)');
        if (props.formState === 'HBASE') {
            props.setFormState('HEDIT')
        }
        console.log('!!!SSS gridPersons.js (line: 164)');
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
            PersonName: "",
            BirthDay: "",
            EmailAddress: "",
            GenderName: "---",
            OrganisationName: "---",
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
                collection: 'vPersons',
                userName: props.userName,
            },
        }).then(async (result) => {
            await ShowData()
            let comboData = await GridComboData(comboPersonsProps);
            props.setPersonsComboData(comboData);
            return;
        }).catch((err) => {
            console.error(err);
        })
    }

    function fieldValid(saveprops) {
        let result = true;
        const validate = myAjv.compile(ajvSchema);
        result = validate(saveprops)
        if (!result) console.log("validation error:", validate.errors)
        return result;
    }

    async function SaveData(saveprops) {
        let recID = 0;
        if (saveprops.ID) { recID = saveprops.ID }
        axios.put(DataURL, {
            'Content-Type': 'application/json',
            'token': props.token,
            'collection': 'vPersons',
            'userName': props.userName,
            'ID': recID,
            'Data': saveprops,
        })
            .then(async (result) => {
                await ShowData();
                props.setFormState("HBASE")
                let comboData = await GridComboData(comboPersonsProps);
                props.setPersonsComboData(comboData);
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
                'collection': 'vPersons',
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

export default GridPersons;