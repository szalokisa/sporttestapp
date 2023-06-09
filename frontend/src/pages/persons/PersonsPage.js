import React from "react";
import { useState } from "react";
import TitleBar from "../../components/titleBar/TitleBar";
import PersonsGrid from "./PersonsGrid";
import PersonsForm from "./PersonsForm";
import './PersonsPage.scss';
import axios from 'axios';
import LoginAlertSite from "../../components/LoginAlertSite/LoginAlertSite"

const PersonsURL = `${process.env.REACT_APP_API_BASE_URL}/persons`;

function PersonsPage(props) {
    const [view, setView] = useState('GRID');
    const [refreshId, setRefreshId] = useState(0);
    const [currentId, setCurrentId] = useState();

    if (!props.token) {
        return <LoginAlertSite
            language={props.language}
            title="Sportolók"
        />
    }

    function addNew() {
        setCurrentId(undefined);
        setView('EDIT');
    }

    function deleteOne(id) {
        axios.delete(PersonsURL, {
            headers: {
                'id': id
            }
        }).then(() => {
            refreshGrid();
        }).catch((err) => {
            console.error(err);
        })
    }

    function refreshGrid() {
        setRefreshId(currentRefreshId => (currentRefreshId + 1));
    }

    function gotoRecord(gotoId) {
        setCurrentId(gotoId);
    }

    function editPerson(Message_File_ID) {
        setCurrentId(Message_File_ID);
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

    function editDuplicated() {
        refreshGrid();
        setCurrentId(undefined);
        setView('DUPLICATE');
    }

    return <main className="page-persons">
        <TitleBar title='Sportolók' />
        <div className={`grid-area ${view}`}>
            <PersonsGrid
                language={props.language}
                onAddNew={addNew}
                onDelete={deleteOne}
                dataSaved={editSaved}
                edit={(id) => editPerson(id)}
                refreshId={refreshId}
                token={props.token}
            />
        </div>

        {
            (view === 'EDIT' || view === 'DUPLICATE') && (
                <div className={`form-area ${view}`}>
                    <PersonsForm
                        language={props.language}
                        onAddNew={addNew}
                        id={currentId}
                        view={view}
                        onSubmit={editSaved}
                        onDuplicate={editDuplicated}
                        onCancel={editCancelled}
                        refreshId={refreshId}
                        dataSaved={editSaved}
                        token={props.token}
                        clubComboData={props.clubComboData}
                    />
                </div>
            )
        }
    </main>
}
export default PersonsPage;