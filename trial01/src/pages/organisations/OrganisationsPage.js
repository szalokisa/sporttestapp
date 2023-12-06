import React, { useRef, useEffect } from "react";
import { useState } from "react";
import TitleBar from "../../components/titleBar/TitleBar";
import OrganisationsGrid from "./OrganisationsGrid"
import './OrganisationsPage.scss';

function OrganisationsPage(props) {
    const [view, setView] = useState('HEAD');
    // const [refreshId, setRefreshId] = useState(0);

    return <main className="page-organisations">
        <TitleBar title='Cégek, szervezetek' />
        {
            <div className={`grid1 ${view}`}>
                <OrganisationsGrid
                    language={props.language}
                    dataEndpoint={`${process.env.REACT_APP_API_BASE_URL}/data`}
                    loginData={props.loginData}
                    setView={setView}
                    view={view}
                />
            </div>
        }
    </main>
}
export default OrganisationsPage;