import React, { useRef, useEffect } from "react";
import { useState } from "react";
import TitleBar from "../../components/titleBar/TitleBar";
import TestGrid from "./TestGrid";
import TestPersonsGrid from "./TestPersonsGrid";
import './TestPage.scss';

function TestPage(props) {
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

    function editChild1Cancelled() {
        setView('RESTOEXGRID');
    }

    return <main className="page-test">
        <TitleBar title='Tesztek' />
        {
            <div className={`grid1 ${view}`}>
                <TestGrid
                    language={props.language}
                    biRef={biRef}
                    dataEndpoint={`${process.env.REACT_APP_API_BASE_URL}/data`}
                    testTemplatesComboData={props.testTemplatesComboData}
                    token={props.token}
                    setView={setView}
                    view={view}
                />
            </div>
        }
        {
            <div className={`grid2 ${view}`}>
                <TestPersonsGrid
                    view={view}
                    biRef={biRef}
                    language={props.language}
                    dataEndpoint={`${process.env.REACT_APP_API_BASE_URL}/data`}
                    token={props.token}
                    personsComboData={props.personsComboData}
                    onCancel={editChild1Cancelled}
                    refreshId={refreshId}
                    setRefreshId={setRefreshId}
                    setView={setView}
                    childGridClosed={childGridClosed}
                />
            </div>
        }
    </main>
}
export default TestPage;