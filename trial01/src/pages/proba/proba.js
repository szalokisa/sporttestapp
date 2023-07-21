import React, { useState } from "react";
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
        <button onClick={() => button0Clicked()}>DEFAULT</button>
        <button onClick={() => button1Clicked()}>SET TO AREA 2</button>
        <button onClick={() => button2Clicked()}>SET TO AREA 1</button>
        <div class="row">
            <div class="col-md-4">
                <div className={`area ${view}`}>
                    proba area 2
                </div>
            </div>
            <div class="col-md-4">
                <div className={`area1 ${view}`}>
                    proba area 1
                </div>
            </div>
            <div class="col-md-4">
                <div className={`area2 ${view}`}>
                    proba area 2
                </div>
            </div>
        </div>
    </main>
    )
}

export default Proba;