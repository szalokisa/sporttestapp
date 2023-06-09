import React from "react";
import { useState } from "react";
import TitleBar from "../../components/titleBar/TitleBar";
import OrganisationsGrid from "./OrganisationsGrid";
import OrganisationsForm from "./OrganisationsForm";
import './OrganisationsPage.scss';
import axios from 'axios';
import comboData from "../../components/comboData/comboData"
import LoginAlertSite from "../../components/LoginAlertSite/LoginAlertSite"

const OrganisationsURL = `${process.env.REACT_APP_API_BASE_URL}/organisations`;

function OrganisationsPage(props) {
    const [view, setView] = useState('GRID');
    const [refreshId, setRefreshId] = useState(0);
    const [currentId, setCurrentId] = useState();

    if (!props.token) {
        return <LoginAlertSite
            language={props.language}
            title="Szervezetek"
        />
    }

    function addNew() {
        setCurrentId(undefined);
        setView('EDIT');
    }

    function deleteOne(id) {
        axios.delete(OrganisationsURL, {
            headers: {
                'id': id
            }
        }).then(() => {
            refreshGrid();
        }).catch((err) => {
            console.error(err);
        })
    }

    async function initClubCombo() {
        const comboProps = {
            token: props.token,
            from: 'organisations_view',
            select: 'value, text',
            language: props.language,
            top: '500',
            where: '',
            groupby: '',
            orderby: 'text',
            with0: 'true',
        }
        const clubComboData = await comboData(comboProps)
        props.setClubComboData(clubComboData);
    }

    function refreshGrid() {
        initClubCombo().then(function (result) {
            setRefreshId(currentRefreshId => (currentRefreshId + 1));
        });
    }

    function gotoRecord(gotoId) {
        setCurrentId(gotoId);
    }

    function editOrganisation(Message_File_ID) {
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
    return <main className="page-organisations">
        <TitleBar title='Klubok, szervezetek' />
        <div className={`grid-area ${view}`}>
            <OrganisationsGrid
                language={props.language}
                onAddNew={addNew}
                onDelete={deleteOne}
                dataSaved={editSaved}
                edit={(id) => editOrganisation(id)}
                refreshId={refreshId}
                token={props.token}
            />
        </div>

        {
            (view === 'EDIT' || view === 'DUPLICATE') && (
                <div className={`form-area ${view}`}>
                    <OrganisationsForm
                        language={props.language}
                        onAddNew={addNew}
                        id={currentId}
                        view={view}
                        onSubmit={editSaved}
                        onDuplicate={editDuplicated}
                        onCancel={editCancelled}
                        refreshId={refreshId}
                        dataSaved={editSaved}
                        setClubComboData={props.setClubComboData}
                        token={props.token}
                    />
                </div>
            )
        }
    </main>
}
export default OrganisationsPage;