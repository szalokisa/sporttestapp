import React, { useRef, useEffect } from "react";
import { useState } from "react";
import TitleBar from "../../components/titleBar/TitleBar";
import PersonsGrid from "./PersonsGrid"
import './PersonsPage.scss';

function PersonsPage(props) {
    const [view, setView] = useState('HEAD');

    return <main className="page-persons">
        <TitleBar title='Sportolók' />
        {
            <div className={`grid1 ${view}`}>
                <PersonsGrid
                    language={props.language}
                    dataEndpoint={`${process.env.REACT_APP_API_BASE_URL}/data`}
                    loginData={props.loginData}
                    setView={setView}
                    organisationsComboData={props.organisationsComboData}
                    gendersComboData={props.gendersComboData}
                    setpersonsComboData={props.setpersonsComboData}
                    view={view}
                />
            </div>
        }
    </main>
}
export default PersonsPage;