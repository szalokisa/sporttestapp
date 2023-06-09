import React, { useState } from "react";
import "./loginPage.scss";
import axios from 'axios';
import comboData from "../../components/comboData/comboData"
import StartSite from "../../components/StartSite/StartSite"

const UsersURL = `${process.env.REACT_APP_API_BASE_URL}/users/login`;

async function GetToken(credentials) {
    let token;
    axios.put(UsersURL, {
        header: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
        },
        body: credentials
    }).then((jsonData) => {
        token = jsonData.data.token;
        credentials.props.setToken(token);
    }).catch((err) => {
        console.error(err);
    })
    return token;
}

async function initClubCombo(props) {
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

    return clubComboData;
}

async function initSportAbilityCombo(props) {
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

const Login = (props) => {
    const [view, setView] = useState('NOTAUTH');

    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const handleSubmit = async (e) => {
        e.preventDefault()
        await GetToken({
            userName,
            password,
            props
        })
        await initClubCombo(props);
        await initSportAbilityCombo(props);
        setView("AUTH");
    }
    return (<main className="login-page">
        <div className={`login-area ${view}`}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
        <div className={`picture-area ${view}`}>
            <StartSite></StartSite>
        </div>
    </main>
    );
}

export default Login;
