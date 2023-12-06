import { forwardRef, useRef, useState, useEffect } from 'react';
import axios from "axios";
import './TableSelect.scss';
import iconSearch from './iconSearch.svg';
import Spinner from 'react-bootstrap/Spinner';
import { replaceAll } from '../../globals';
import DataGrid from '../../../components/dataGrid/DataGrid';

export const TableSelect = forwardRef((props, ref) => {
    const [dataLoadingStatus, setDataLoadingStatus] = useState('NOT-LOADED');
    const [data, setData] = useState({
        filter: '',
        columns: [],
        data: [],
    })
    const [tableVisible, setTableVisible] = useState(false);

    function getSanitizedString(text) {
        return replaceAll(text || '', "'", "''");
    }

    function getFilter() {
        const sanitizedValue = getSanitizedString(props.value);
        return replaceAll(props.optionList.where, '?', sanitizedValue)
    }

    async function getDataFromServer(filter, limit) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/data`, {
            headers: {
                'x-token': props.loginData.getToken(),
                'x-collection': props.optionList.code,
                'x-limit': limit || props.optionList.maxRecords || 0,
                'x-filter': filter,
                'x-sort': props.optionList.text,
                'x-language': props.language,
            },
        })
    }

    useEffect(() => {
        if (dataLoadingStatus === 'LOADING') {
            getDataFromServer(getFilter())
                .then((result) => {
                    setData({
                        filter: props.value,
                        columns: props.optionList.selectedColumns.map(colName => {
                            const columnProperties = result.data.columns.find(dataColumn => (dataColumn.name === colName));
                            return {
                                field: columnProperties.name,
                                type: columnProperties.type,
                            }
                        }),
                        data: result.data.data,
                    });
                    setDataLoadingStatus('LOADED')
                    if (!props.idValue && ref.current.value) {
                        setNewValue({
                            text: ref.current.value,
                            id: getIdFromData(ref.current.value)
                        })
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setDataLoadingStatus('NOT-LOADED');
                });
        }
    }, [dataLoadingStatus])

    function handleInputChange() {
        const newValue = ref.current.value;
        setNewValue({
            text: newValue,
            id: getIdFromData(newValue),
        })

        activateList();
    }

    function showTable() {
        setTableVisible(() => (true))
    }

    function hideTable() {
        setTableVisible(() => (false))
    }

    function activateList() {
        const activateAt = props.optionList.activateAt;
        const currentValue = ref.current.value || '';

        if (!activateAt) {
            return;
        }

        if (!isDataFilterValid(currentValue)) {
            if (currentValue.length < activateAt) {
                hideTable();
                return;
            }
            setDataLoadingStatus('LOADING');
        }

        showTable();
    }

    function isDataFilterValid(text) {
        if (dataLoadingStatus !== 'LOADED') {
            return false;
        }

        if (data.filter) {
            const filterLength = data.filter.length;
            if (data.filter !== text.substring(0, filterLength)) {
                return false;
            }
        }

        return true;
    }

    function getIdFromData(text) {
        if (!text) {
            return undefined;
        }

        if (!isDataFilterValid(text)) {
            return undefined;
        }

        const dataRow = data.data.find((row) => (row[props.name] === text));
        if (!dataRow) {
            return undefined;
        }

        return dataRow[`${props.name}_ID`];
    }

    async function handleInputBlur(e) {
        if (props.idValue && !ref.current.value) {
            setNewValue({
                text: ref.current.value,
                id: undefined,
            })
        }
        if (!props.idValue && ref.current.value) {
            const result = await getDataFromServer(`${props.optionList.text} like '${getSanitizedString(ref.current.value)}%'`, 2)
            if (result.data.data.length !== 1) {
                setNewValue({
                    text: ref.current.value,
                    id: undefined,
                })
            } else {
                setNewValue({
                    text: result.data.data[0][props.optionList.text],
                    id: result.data.data[0][props.optionList.id],
                })

                hideTable();
            }
        }

        props.onBlur({
            target: {
                name: props.name,
                value: ref.current.value,
            }
        })
    }

    function onButtonFind() {
        //if data just loading --> stop it and hide the table
        if (dataLoadingStatus === 'LOADING') {
            setDataLoadingStatus('NOT_LOADED');
            hideTable()
            return;
        }

        //if the table is visible then hide it
        if (tableVisible) {
            hideTable();
            return;
        }

        //the table is currently hidden --> show it
        //... but load data first if necessary
        if (dataLoadingStatus === 'NOT-LOADED' || !isDataFilterValid(ref.current.value)) {
            setDataLoadingStatus('LOADING');
        }

        showTable();
    }

    function setNewValue(newValues) {
        props.onChange({
            target: {
                name: props.name,
                value: newValues.text,
            }
        })
        props.onChange({
            target: {
                name: `${props.name}_ID`,
                value: newValues.id,
            }
        })
    }

    function onRowDoubleClick(row) {
        setNewValue({
            text: row.data._origData[props.optionList.text],
            id: row.data._origData[props.optionList.id],
        })
        hideTable();
    }

    function getDataFiltered() {
        const currentValue = (ref.current.value || '').toUpperCase();
        const filterLength = currentValue.length;
        const textField = props.optionList.text;

        if (!dataLoadingStatus === 'LOADED' || !isDataFilterValid(ref.current.value)) {
            return [];
        }

        if (filterLength === 0) {
            return data.data;
        }

        return data.data.filter((row) => (
            (currentValue === row[textField].substring(0, filterLength).toUpperCase()))
        );
    }

    return (
        <div className='tableSelect'>
            {props.labelArea}
            {props.explanationTextArea}
            <div className={props.divErrorClass}>
                <div className="table-select-controls">
                    <div className={`table-select-input-area ${props.divErrorClass}`}>
                        <input
                            className={`form-control table-select ${props.className}`}
                            id={props.name}
                            name={props.name}
                            value={props.value}
                            readOnly={(props.readOnly || dataLoadingStatus === 'LOADING')}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            ref={ref}
                            autoComplete='off'
                        >
                        </input>
                        {props.divError}
                    </div>
                    <div className="table-select-button-area">
                        <button name="table-select-find-button" type="button" className="btn btn-info" tabIndex={-1} onClick={onButtonFind}>
                            {(dataLoadingStatus !== 'LOADING') &&
                                <img src={iconSearch} alt="search" width="24px" height="24px" />
                            }
                            {(dataLoadingStatus === 'LOADING') &&
                                <Spinner className='table-select-spinner' animation='border' size="sm" />
                            }
                        </button>
                    </div>
                </div>
            </div>
            {
                (tableVisible && dataLoadingStatus === 'LOADED') &&
                <div className="table-select-table-area">
                    <DataGrid
                        id={`${props.name}-dataGrid`}
                        columns={data.columns}
                        language={props.language}
                        languageElements={props.optionList.languageElements}
                        data={getDataFiltered()}
                        onRowDoubleClick={(row) => onRowDoubleClick(row)}
                        gridHeight="100%"
                    />
                </div>
            }
        </div>
    )
})
