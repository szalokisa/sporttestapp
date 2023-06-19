import React, { useRef } from "react";
import { useState } from "react";
import TitleBar from "../../components/titleBar/TitleBar";
import ExercisesGrid from "./ExercisesGrid";
import ResToExGrid from "./ResToExGrid";
import './ExercisesPage.scss';

function ExercisesPage(props) {
    const [view, setView] = useState('HEAD');
    const [currentExerciseId, setCurrentExerciseId] = useState();

    function PageShowDataChildFromParent(props) {
        biRef.resToExShowDataChild(props);
    }

    function PageSetParentID(props) {
        console.log('+++ ExercisesPage.js (line: 17)',props);
        biRef.resToExSetParID(props);
    }

    // Add all the functions here that the child can call.
    var biRef = {
        ExerciseGridShowDataChildFromParent: PageShowDataChildFromParent,
        ExerciseGridSetParentID: PageSetParentID,
    }

    function editExercise(Message_File_ID) {
        setCurrentExerciseId(Message_File_ID);
        console.log('+++ ExercisesPage.js (line: 29)', currentExerciseId);
        setView('EDIT');
    }

    function editResToExCancelled() {
        setView('RESTOEXGRID');
    }

    return <main className="page-exercises">
        <TitleBar title='Gyakoraltok' />
        {
            <div className={`grid1 ${view}`}>
                <ExercisesGrid
                    language={props.language}
                    biRef={biRef}
                    // edit={(id) => editExercise(id)}
                    dataEndpoint={`${process.env.REACT_APP_API_BASE_URL}/data`}
                    sportAbilitiesComboData={props.sportAbilitiesComboData}
                    token={props.token}
                    // setCurrentExerciseId={setCurrentExerciseId}
                    setView={setView}
                />
            </div>
        }
        {
            <div className={`grid2 ${view}`}>
                <ResToExGrid
                    view={view}
                    biRef={biRef}
                    language={props.language}
                    dataEndpoint={`${process.env.REACT_APP_API_BASE_URL}/data`}
                    token={props.token}
                    // currentExerciseId={currentExerciseId}
                    unitComboData={props.unitComboData}
                    onCancel={editResToExCancelled}
                    setView={setView}
                />
            </div>
        }
    </main>
}
export default ExercisesPage;