import React from "react";
import { useState } from "react";
import TitleBar from "../../components/titleBar/TitleBar";
import SportAbilitiesGrid from "./SportAbilitiesGrid";
import SportAbilitiesForm from "./SportAbilitiesForm";
import './SportAbilitiesPage.scss';
import axios from 'axios';
import comboData from "../../components/comboData/comboData"
import LoginAlertSite from "../../components/LoginAlertSite/LoginAlertSite"

const SportAbilitiesURL = `${process.env.REACT_APP_API_BASE_URL}/sportabilities`;

function SportAbilitiesPage(props) {
    const [view, setView] = useState('GRID');
    const [refreshId, setRefreshId] = useState(0);
    const [currentId, setCurrentId] = useState();
    if (!props.token) {
        return <LoginAlertSite
            language={props.language}
            title="Képességek"
        />
    }

    function addNew() {
        setCurrentId(undefined);
        setView('EDIT');
    }

    function deleteOne(id) {
        axios.delete(SportAbilitiesURL, {
            headers: {
                'id': id,
            }
        }).then(() => {
            refreshGrid();
        }).catch((err) => {
            console.error(err);
        })
    }

    async function initSportAbilityCombo() {
        const comboProps = {
            token: props.token,
            from: 'sportabilities_view',
            select: 'value, text',
            language: props.language,
            top: '500',
            where: '',
            groupby: '',
            orderby: 'text',
            with0: 'true',
        }
        const sportAbilitiesComboData = await comboData(comboProps)
        props.setSportAbilitiesComboData(sportAbilitiesComboData);

        return sportAbilitiesComboData;
    }

    function refreshGrid() {
        initSportAbilityCombo().then(function (result) {
            setRefreshId(currentRefreshId => (currentRefreshId + 1));
        });
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

    return <main className="page-sportabilities">
        <TitleBar title='Képességek' />
        <div className={`grid-area ${view}`}>
            <SportAbilitiesGrid
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
                    <SportAbilitiesForm
                        language={props.language}
                        onAddNew={addNew}
                        id={currentId}
                        view={view}
                        onSubmit={editSaved}
                        onDuplicate={editDuplicated}
                        onCancel={editCancelled}
                        refreshId={refreshId}
                        dataSaved={editSaved}
                        setSportAbilitiesComboData={props.setSportAbilitiesComboData}
                        token={props.token}
                    />
                </div>
            )
        }
    </main>
}
export default SportAbilitiesPage;