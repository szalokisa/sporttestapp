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
        biRef.childShowDataChild(props);
    }

    function PageSetParentID(props) {
        biRef.childSetParID(props);
    }

    function PageSetParentName(props) {
        biRef.childSetParName(props);
    }

    function childGridClosed() {
        biRef.childGridClosed();
    }

    // Add all the functions here that the child can call.
    var biRef = {
        HeadGridShowDataChildFromParent: PageShowDataChildFromParent,
        HeadGridSetParentID: PageSetParentID,
        HeadGridSetParentName: PageSetParentName,
        childGridClosed: childGridClosed,
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
                    dataEndpoint={`${process.env.REACT_APP_API_BASE_URL}/data`}
                    sportAbilitiesComboData={props.sportAbilitiesComboData}
                    loginData={props.loginData}
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
                    loginData={props.loginData}
                    unitComboData={props.unitComboData}
                    onCancel={editResToExCancelled}
                    refreshId={refreshId}
                    setRefreshId={setRefreshId}
                    setView={setView}
                    childGridClosed={childGridClosed}
                />
            </div>
        }
    </main>
}
export default ExercisesPage;