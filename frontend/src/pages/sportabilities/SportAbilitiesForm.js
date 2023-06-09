import { useRef, useState, useEffect } from 'react';
import './SportAbilitiesForm.scss';
import { languageElements } from './SportAbilitiesForm-languageElements';
import LanguageElementsHandler from '../../repository/LanguageElementsHandler';
import SelFP from '../../repository/SelForm/SelFP';
import SelFieldGroup from '../../repository/SelForm/SelFieldGroup/SelFieldGroup';
import axios from 'axios';

export default function SportAbilitiesForm(props) {
    const SportAbilitiesURL = `${process.env.REACT_APP_API_BASE_URL}/sportabilities`;

    const languageElementsHandler = new LanguageElementsHandler(
        languageElements,
        props.language
    );

    const fields = [{
        reference: useRef(),
        name: 'SportAbilityName',
        labelText: languageElementsHandler.get(`field-SportAbilityName`),
        type: 'text',
        initialValue: '',
        validators: ['required',]
    },
    {
        reference: useRef(),
        name: 'Remark',
        type: 'text',
        labelText: languageElementsHandler.get(`field-Remark`),
        initialValue: '',
        validators: []
    },
    ]

    const fp = new SelFP({
        language: props.language,
        languageElements,
        fields,
    });

    const [fpStates, setFpStates] = useState(fp.initStates());
    const [dataStatus, setDataStatus] = useState('');

    useEffect(() => {
        if (props.view !== 'EDIT' && props.view !== 'DUPLICATE') {
            return;
        }

        if (props.view === 'DUPLICATE') {
            prepareDuplicate();
            return;
        }

        if (!props.id) {
            fp.clearAllFields(fpStates, setFpStates)
            return;
        };

        axios.get(SportAbilitiesURL, {
            headers: {
                'id': props.id
            }
        }).then((result) => {
            fp.setValues(fpStates, setFpStates, result.data.data[0]);
        });
    }, [props.id, props.view, props.refreshId])

    function prepareDuplicate() {
        fp.setFieldValue('Message_File_ID', undefined, setFpStates);
    }

    function handleInputBlur(e) {
        fp.handleInputBlur(e, fpStates, setFpStates);
    }

    function handleInputChange(e) {
        fp.handleInputChange(e, fpStates, setFpStates);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        save(props.onSubmit);
    }

    // function handleDuplicate() {
    //     props.onDuplicate();
    // }

    async function save(callback) {
        if (!fp.isGroupValid(fpStates, setFpStates)) {
            return;
        }
        let recID = 0;
        if (props.id) { recID = props.id }
        axios.put(SportAbilitiesURL, {
            headers: {
                'Content-Type': 'application/json',
                id: recID,
                SportAbilityName: fpStates.fieldValues.SportAbilityName,
                Remark: fpStates.fieldValues.Remark,
            }
        })
            .then((result) => {
                props.onSubmit({ id: props.id });
                return;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <div className="form-sportabilities">
            <form
                onSubmit={handleSubmit}
                noValidate={true}
                className={`needs-validation ${fpStates.formWasValidated ? 'was-validated' : ''
                    }`}
            >
                <SelFieldGroup
                    groupName='field-group'
                    language={props.language}
                    languageElements={languageElements}
                    fields={fields}
                    fpStates={fpStates}
                    handleInputBlur={handleInputBlur}
                    handleInputChange={handleInputChange}
                />

                <div className='btn-area'>
                    <button type='submit' className='btn btn-success'>
                        {languageElementsHandler.get(`btn-submit`)}
                    </button>
                    {/* <button type='button' className='btn btn-success' onClick={() => { save(handleDuplicate) }}>
                        {languageElementsHandler.get(`btn-duplicate`)}
                    </button> */}
                    <button type='button' className='btn btn-secondary' onClick={props.onCancel}>
                        {languageElementsHandler.get(`btn-cancel`)}
                    </button>
                </div>
            </form>
        </div>
    )
}