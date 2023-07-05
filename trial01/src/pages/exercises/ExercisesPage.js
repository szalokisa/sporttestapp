import React, { useRef, useEffect } from "react";
import { useState } from "react";
import TitleBar from "../../components/titleBar/TitleBar";
import ExercisesGrid from "./ExercisesGrid";
import ResToExGrid from "./ResToExGrid";
import './ExercisesPage.scss';

function ExercisesPage(props) {
    const [view, setView] = useState('HEAD');
    const [refreshId, setRefreshId] = useState(0);

    function PageShowDataChildFromParent(props) {
        biRef.resToExShowDataChild(props);
    }

    function PageSetParentID(props) {
        biRef.resToExSetParID(props);
    }

    function exGridClosed() {
        biRef.exGridClosed();
    }

    // Add all the functions here that the child can call.
    var biRef = {
        ExerciseGridShowDataChildFromParent: PageShowDataChildFromParent,
        ExerciseGridSetParentID: PageSetParentID,
        exGridClosed: exGridClosed,
    }

    // function refreshGrid() {
    //     setRefreshId(currentRefreshId => (currentRefreshId + 1));
    // }

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
                    dataEndpoint={`${process.env.REACT_APP_API_BASE_URL}/data`}
                    sportAbilitiesComboData={props.sportAbilitiesComboData}
                    token={props.token}
                    setView={setView}
                    view={view}
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
                    unitComboData={props.unitComboData}
                    onCancel={editResToExCancelled}
                    refreshId={refreshId}
                    setRefreshId={setRefreshId}
                    setView={setView}
                    exGridClosed={exGridClosed}
                />
            </div>
        }
    </main>
}
export default ExercisesPage;