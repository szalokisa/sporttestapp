import React, { useState } from "react";
import StatSite from '../../components/StatSite/StatSite'
import StatSite2 from '../../components/StatSite/StatSite2'
import StatSite3 from '../../components/StatSite/StatSite3'

import "./proba.scss";

const Proba = (props) => {
    const [view, setView] = useState('DEFAULT');

    const button0Clicked = () => {
        setView('DEFAULT');
    };
    const button1Clicked = () => {
        setView('A2');
    };
    const button2Clicked = () => {
        setView('A1');
    };

    return (<main className="proba-page">
        <button onClick={() => button0Clicked()}>Statisztika 1</button>
        <button onClick={() => button1Clicked()}>Statisztika 2</button>
        <button onClick={() => button2Clicked()}>Statisztika 3</button>
        <div className={`area ${view}`}>
            <StatSite></StatSite>
        </div>
        <div className={`area1 ${view}`}>
            <StatSite2></StatSite2>
        </div>
        <div className={`area2 ${view}`}>
            <StatSite3></StatSite3>
        </div>
    </main>
    )
}

export default Proba;