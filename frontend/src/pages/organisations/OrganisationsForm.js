import { useRef, useState, useEffect } from 'react';
import './OrganisationsForm.scss';
import { languageElements } from './OrganisationsForm-languageElements';
import LanguageElementsHandler from '../../repository/LanguageElementsHandler';
import SelFP from '../../repository/SelForm/SelFP';
import SelFieldGroup from '../../repository/SelForm/SelFieldGroup/SelFieldGroup';
import axios from 'axios';

export default function OrganisationsForm(props) {
    const OrganisationsURL = `${process.env.REACT_APP_API_BASE_URL}/organisations`;
    const languageElementsHandler = new LanguageElementsHandler(
        languageElements,
        props.language
    );

    const fields = [{
        reference: useRef(),
        name: 'OrganisationName',
        labelText: languageElementsHandler.get(`field-OrganisationName`),
        type: 'text',
        initialValue: '',
        validators: ['required',]
    },
    {
        reference: useRef(),
        name: 'EmailAddress',
        type: 'text',
        labelText: languageElementsHandler.get(`field-EmailAddress`),
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
        axios.get(OrganisationsURL, {
            headers: {
                'id': props.id
            }
        }).then((result) => {
            fp.setValues(fpStates, setFpStates, result.data.data[0]);
        });
    }, [props.id, props.view, props.refreshId])
    
    function prepareDuplicate() {
        fp.setFieldValue('Message_File_ID', undefined, setFpStates);
        fp.setFieldValue('ClubID', '', setFpStates);
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

        axios.put(OrganisationsURL, {
            headers: {
                'Content-Type': 'application/json',
                id: recID,
                OrganisationName: fpStates.fieldValues.OrganisationName,
                EmailAddress: fpStates.fieldValues.EmailAddress,
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
        <div className="form-organisation">
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