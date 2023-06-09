import { useRef, useState, useEffect } from 'react';
import './ResToExForm.scss';
import { languageElements } from './ExercisesForm-languageElements';
import LanguageElementsHandler from '../../repository/LanguageElementsHandler';
import SelFP from '../../repository/SelForm/SelFP';
import SelFieldGroup from '../../repository/SelForm/SelFieldGroup/SelFieldGroup';
import axios from 'axios';
import ResToExGrid from './ResToExGrid';
import { reportParams } from './ResToExGrid-params';
import FunctionCell_EditDelete from '../../components/dataGrid/functionCells/editDelete/FunctionCell_EditDelete';

export default function ResToExForm(props) {
    // const ExercisesURL = `${process.env.REACT_APP_API_BASE_URL}/exercises`;
    // const languageElementsHandler = new LanguageElementsHandler(
    //     languageElements,
    //     props.language
    // );

    // const fields = [{
    //     reference: useRef(),
    //     name: 'ExerciseName',
    //     labelText: languageElementsHandler.get(`field-ExerciseName`),
    //     type: 'text',
    //     initialValue: '',
    //     validators: ['required',]
    // },
    // {
    //     reference: useRef(),
    //     name: 'ExerciseDescription',
    //     type: 'text',
    //     labelText: languageElementsHandler.get(`field-ExerciseDescription`),
    //     initialValue: '',
    //     validators: ['required']
    // },
    // {
    //     reference: useRef(),
    //     name: 'SportAbilitiesID',
    //     type: 'select',
    //     labelText: languageElementsHandler.get(`field-SportAbilitiesID`),
    //     optionList: props.sportAbilitiesComboData,
    //     initialValue: '',
    //     validators: ['required']
    // },
    // ]

    // const fp = new SelFP({
    //     language: props.language,
    //     languageElements,
    //     fields,
    // });

    // const [fpStates, setFpStates] = useState(fp.initStates());
    // const [dataStatus, setDataStatus] = useState('');

    // async function editResToEx(id) {
    //     props.edit(id);
    //     return;
    // };

    // async function deleteResToEx(id) {
    //     props.onDelete(id);
    // }

    // useEffect(() => {
    //     if (props.view !== 'EDIT' && props.view !== 'DUPLICATE') {
    //         return;
    //     }

    //     if (props.view === 'DUPLICATE') {
    //         prepareDuplicate();
    //         return;
    //     }

    //     if (!props.id) {
    //         fp.clearAllFields(fpStates, setFpStates)
    //         return;
    //     };

    //     axios.get(ExercisesURL, {
    //         headers: {
    //             'id': props.id
    //         }
    //     }).then((result) => {
    //         fp.setValues(fpStates, setFpStates, result.data.data[0]);
    //     });
    // }, [props.id, props.view, props.refreshId])

    // function prepareDuplicate() {
    //     fp.setFieldValue('Message_File_ID', undefined, setFpStates);
    // }

    // function handleInputBlur(e) {
    //     fp.handleInputBlur(e, fpStates, setFpStates);
    // }

    // function handleInputChange(e) {
    //     fp.handleInputChange(e, fpStates, setFpStates);
    // }

    // async function handleSubmit(e) {
    //     e.preventDefault();
    //     save(props.onSubmit);
    // }

    // async function save(callback) {
    //     if (!fp.isGroupValid(fpStates, setFpStates)) {
    //         return;
    //     }
    //     let recID = 0;
    //     if (props.id) { recID = props.id }
    //     axios.put(ExercisesURL, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             id: recID,
    //             ExerciseName: fpStates.fieldValues.ExerciseName,
    //             ExerciseDescription: fpStates.fieldValues.ExerciseDescription,
    //             SportAbilitiesID: fpStates.fieldValues.SportAbilitiesID,
    //         }
    //     })
    //         .then((result) => {
    //             props.onSubmit({ id: props.id });
    //             return;
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // }

    return (
        <div>
            <h2>...</h2>
        </div>
    )

    // return (
    //     <div className="form-exercises">
    //         <form
    //             onSubmit={handleSubmit}
    //             noValidate={true}
    //             className={`needs-validation ${fpStates.formWasValidated ? 'was-validated' : ''
    //                 }`}
    //         >
    //             <SelFieldGroup
    //                 groupName='field-group'
    //                 language={props.language}
    //                 languageElements={languageElements}
    //                 fields={fields}
    //                 fpStates={fpStates}
    //                 handleInputBlur={handleInputBlur}
    //                 handleInputChange={handleInputChange}
    //             />
    //             <ResToExGrid
    //                 id="ResToExGrid"
    //                 language={props.language}
    //                 token={props.token}
    //                 onAddNew={props.onAddNew}
    //                 refreshId={props.refreshId || 0}
    //                 dataEndpoint={`${process.env.REACT_APP_API_BASE_URL}/data`}
    //                 rowSelection={props.rowSelection}
    //                 rowMultiSelectWithClick={props.rowMultiSelectWithClick}
    //                 report={{
    //                     reportId: "ExercisesGrid",
    //                     reportParams,
    //                     languageElements,
    //                     frameWorkComponents: {
    //                         FunctionCell_EditDelete,
    //                     },
    //                     cellRenderers: [
    //                         {
    //                             field: "Message_File_ID",
    //                             cellRenderer: "FunctionCell_EditDelete",
    //                             cellRendererParams: {
    //                                 pencilClicked: (id) => editResToEx(id),
    //                                 trashClicked: (id) => deleteResToEx(id),
    //                             },
    //                         },
    //                     ],
    //                 }}
    //             />
    //             <div className='btn-area'>
    //                 <button type='submit' className='btn btn-success'>
    //                     {languageElementsHandler.get(`btn-submit`)}
    //                 </button>
    //                 {/* <button type='button' className='btn btn-success' onClick={() => { save(handleDuplicate) }}>
    //                     {languageElementsHandler.get(`btn-duplicate`)}
    //                 </button> */}
    //                 <button type='button' className='btn btn-secondary' onClick={props.onCancel}>
    //                     {languageElementsHandler.get(`btn-cancel`)}
    //                 </button>
    //             </div>
    //         </form>
    //     </div >
    // )
}