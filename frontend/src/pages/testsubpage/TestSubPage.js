import React from "react";
import { useState } from "react";
import TitleBar from "../../components/titleBar/TitleBar";
import './TestSubPage.scss';
import LoginAlertSite from "../../components/LoginAlertSite/LoginAlertSite"
import PlusIcon from '../../components/gridReport/plus.svg';

function TestSubPage(props) {
    const [view, setView] = useState('GRID');
    const [refreshId, setRefreshId] = useState(0);
    const [currentId, setCurrentId] = useState();
    const [subgridColumns, setSubGridColumns] = useState([]);

    if (!props.token) {
        return <LoginAlertSite
            language={props.language}
            title="Gyakorlatok"
        />
    }

    function refreshGrid() {
        setRefreshId(currentRefreshId => (currentRefreshId + 1));
    }

    function editData() {
        setView('EDIT');
    }

    function editCancelled() {
        setView('GRID');
    }

    function editSaved(record) {
        refreshGrid();
        setCurrentId(record.id);
        setView('GRID');
    }

    return <main className="page-testsub">
        <TitleBar title='teszt form' />
        {
            (view === 'GRID') && (
                <div className={`grid-area ${view}`}>
                    <h1>ITT A GRID TERÜLET</h1>
                    <button type="button" className="btn btn-warning btn-add" onClick={editData}>
                        <img className="Add-icon" src={PlusIcon} alt="Refresh-icon.svg" />
                    </button>
                </div>
            )
        }

        {
            (view === 'EDIT') && (
                <div className={`form-area ${view}`}>
                    <h1>ITT AZ EDIT TERÜLET</h1>
                    <button type="button" className="btn btn-warning btn-add" onClick={editCancelled}>
                        <img className="Add-icon" src={PlusIcon} alt="Refresh-icon.svg" />
                    </button>
                    <button type="button" className="btn btn-warning btn-add" onClick={editCancelled}>
                        <img className="Add-icon" src={PlusIcon} alt="Refresh-icon.svg" />
                    </button>
                </div>
            )
        }
    </main>
}
export default TestSubPage;