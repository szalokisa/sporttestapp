import React from "react";
import TitleBar from "../../components/titleBar/TitleBar";
import StartSite from "../../components/StartSite/StartSite"

function StartPage(props) {

    return <main className="page-start">
        <TitleBar title='Sport teszt app' />
        <StartSite></StartSite>
        {
            props.setToken("")
        }
    </main>
}
export default StartPage;