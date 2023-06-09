import React from "react";
import { useState } from "react";
import TitleBar from "../../components/titleBar/TitleBar";
import ResToExGrid from "./ResToExGrid";
import ResToExForm from "./ResToExForm";

import './ResToExPage.scss';
import axios from 'axios';

function ResToExPage(props) {
    const [view, setView] = useState('SUBGRID');

    return <main className="page-restoex">
        <TitleBar title='Várt eredmények' />
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div className={`subgrid-area ${view}`}>
                        <ResToExGrid
                            language={props.language}
                            languageElements={props.languageElements}
                            token={props.token}
                        ></ResToExGrid>
                    </div>
                </div>
                <div class="col-md-6">
                    {
                        (view === 'SUBGRID') && (
                            <div className={`subform-area ${view}`}>
                                <ResToExForm
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>


    </main>
}
export default ResToExPage;