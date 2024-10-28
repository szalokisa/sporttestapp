import React, { useRef, useEffect } from "react";
import { useState } from "react";
import TitleBar from "../../components/titleBar/TitleBar";
import SportAbilitiesGrid from "./SportAbilitiesGrid";
import './SportAbilitiesPage.scss';

function SportAbilitiesPage(props) {
    const [view, setView] = useState('HEAD');
    // const [refreshId, setRefreshId] = useState(0);

    return <main className="page-sportab">
        <TitleBar title='Képességek' />
        {
            <div className={`grid1 ${view}`}>
                <SportAbilitiesGrid
                    language={props.language}
                    dataEndpoint={`${process.env.REACT_APP_API_BASE_URL}/data`}
                    setSportAbilitiesComboData={props.setSportAbilitiesComboData}
                    loginData={props.loginData}
                    setView={setView}
                    view={view}
                />
            </div>
        }
    </main>
}
export default SportAbilitiesPage;