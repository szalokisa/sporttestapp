import React, { useRef, useEffect } from "react";
import { useState } from "react";
import TitleBar from "../../components/titleBar/TitleBar";
import TestTemplatesGrid from "./TestTemplatesGrid";
import TestTemplatesLineGrid from "./TestTemplatesLineGrid";
import './TestTemplatesPage.scss';

function TestTemplatesPage(props) {
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

    return <main className="page-testtemplates">
        <TitleBar title='Teszt sablonok' />
        {
            <div className={`grid1 ${view}`}>
                <TestTemplatesGrid
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
                <TestTemplatesLineGrid
                    view={view}
                    biRef={biRef}
                    language={props.language}
                    dataEndpoint={`${process.env.REACT_APP_API_BASE_URL}/data`}
                    loginData={props.loginData}
                    exercisesComboData={props.exercisesComboData}
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
export default TestTemplatesPage;