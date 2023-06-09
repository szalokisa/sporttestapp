import React from "react";
import { useState } from "react";
import TitleBar from "../../components/titleBar/TitleBar";
import ExercisesGrid from "./ExercisesGrid";
import ExercisesForm from "./ExercisesForm";
import './ExercisesPage.scss';
import axios from 'axios';
import LoginAlertSite from "../../components/LoginAlertSite/LoginAlertSite"
import ResToExGrid from "./ResToExGrid";

const ExercisesURL = `${process.env.REACT_APP_API_BASE_URL}/exercises`;
const ExercisesToResURL = `${process.env.REACT_APP_API_BASE_URL}/exercisestores`;

function ExercisesPage(props) {
    console.log('+++ ExercisesPage.js (line: 15)',props);
    const [view, setView] = useState('GRID');
    const [refreshId, setRefreshId] = useState(0);
    const [currentId, setCurrentId] = useState();
    const [currentExerciseName, setCurrentExerciseName] = useState();
    const [refreshResId, setRefreshResId] = useState(0);
    const [currentResId, setCurrentResId] = useState(0);

    if (!props.token) {
        return <LoginAlertSite
            language={props.language}
            title="Gyakorlatok"
        />
    }

    function addNew() {
        setCurrentId(undefined);
        setView('EDIT');
    }

    function addNewRes() {
        setCurrentResId(undefined);
        setView('EDITRES');
    }

    function deleteOne(id) {
        axios.delete(ExercisesURL, {
            headers: {
                'id': id,
            }
        }).then(() => {
            refreshGrid();
        }).catch((err) => {
            console.error(err);
        })
    }

    function deleteOneRes(resid) {
        axios.delete(ExercisesToResURL, {
            headers: {
                'id': resid,
            }
        }).then(() => {
            refreshResGrid();
        }).catch((err) => {
            console.error(err);
        })
    }

    function refreshGrid() {
        setRefreshId(currentRefreshId => (currentRefreshId + 1));
    }

    function refreshResGrid() {
        setRefreshResId(currentRefreshResId => (currentRefreshResId + 1));
    }

    // function gotoRecord(gotoId) {
    //     setCurrentId(gotoId);
    // }

    function editExercise(Message_File_ID) {
        setCurrentId(Message_File_ID);
        setView('EDIT');
    }

    function editExToRes(ResToExID) {
        setCurrentResId(ResToExID);
        setView('EDITRESTOEX');
    }

    function showResGrid(ExercisesID) {
        setCurrentResId(ExercisesID);
        setView('RESTOEXGRID');
    }

    function editCancelled() {
        setView('GRID');
    }

    function editResToExCancelled() {
        setView('RESTOEXGRID');
    }

    function editSaved(record) {
        refreshGrid();
        setCurrentId(record.id);
        setView('GRID');
    }

    function editResToExSaved(record) {
        refreshResGrid();
        setCurrentResId(record.id);
        setView('RESTOEXGRID');
    }

    function editDuplicated() {
        refreshGrid();
        setCurrentId(undefined);
        setView('DUPLICATE');
    }

    return <main className="page-exercises">
        <TitleBar title='Gyakoraltok' />
        {
            <div className={`grid-area ${view}`}>
                <ExercisesGrid
                    language={props.language}
                    onAddNew={addNew}
                    onDelete={deleteOne}
                    dataSaved={editSaved}
                    edit={(id) => editExercise(id)}
                    refreshId={refreshId}
                    token={props.token}
                />
            </div>
        }

        {
            (view === 'EDIT') && (
                <div className={`form-area ${view}`}>
                    <ExercisesForm
                        language={props.language}
                        onAddNew={addNew}
                        id={currentId}
                        view={view}
                        onSubmit={editSaved}
                        onDuplicate={editDuplicated}
                        onCancel={editCancelled}
                        showResGrid={(id) => showResGrid(id)}
                        refreshId={refreshId}
                        dataSaved={editSaved}
                        token={props.token}
                        sportAbilitiesComboData={props.sportAbilitiesComboData}
                    />
                </div>
            )
        }
        {
            (view === 'RESTOEXGRID') && (
                <div className={`restoexgrid-area ${view}`}>
                    <h1>{`VIEW: ${currentId}`}</h1>
                    <ResToExGrid
                        view={view}
                        language={props.language}
                        onAddNew={addNewRes}
                        onDelete={deleteOneRes}
                        dataSaved={editResToExSaved}
                        edit={(id) => editExToRes(id)}
                        refreshId={refreshResId}
                        token={props.token}

                        // onSubmit={editSaved}
                        onCancel={editResToExCancelled}
                    />
                </div>
            )
        }
        {
            (view === 'EDITRES') && (
                <div className={`form-area ${view}`}>
                    <ExercisesForm
                        language={props.language}
                        onAddNew={addNewRes}
                        id={currentId}
                        view={view}
                        onSubmit={editSaved}
                        onDuplicate={editDuplicated}
                        onCancel={editCancelled}
                        refreshId={refreshId}
                        dataSaved={editSaved}
                        token={props.token}
                        sportAbilitiesComboData={props.sportAbilitiesComboData}
                    />
                </div>
            )
        }
    </main>
}
export default ExercisesPage;