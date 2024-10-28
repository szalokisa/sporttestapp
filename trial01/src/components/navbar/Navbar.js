import { useState, Fragment } from 'react';
import './Navbar.scss';
import { NavLink } from 'react-router-dom';
import { List as HamMenuIcon } from 'react-bootstrap-icons';

export default function Navbar() {
    console.log('!!!SSS Navbar.js (line: 7)');
    const [hamMenu, setHamMenu] = useState('CLOSED')

    function closeHamMenu() {
        setHamMenu('CLOSED');
    }

    function changeHamMenu() {
        setHamMenu((currentState) => ((currentState === 'CLOSED') ? 'OPEN' : 'CLOSED'))
    }

    return (
        <nav className="main-navbar">
            <Fragment>

                <div id="main-navbar-ham" onClick={changeHamMenu}>
                    <HamMenuIcon />
                </div>

                <div id="main-menu" className={hamMenu}>
                    <ul className="top-level">
                        <li>
                            <NavLink to="/sportabilities" onClick={closeHamMenu}>Képességek</NavLink>
                        </li>
                        <li>
                            <NavLink to="/exercises" onClick={closeHamMenu}>Gyakorlatok</NavLink>
                        </li>
                        <li>
                            <NavLink to="/organisations" onClick={closeHamMenu}>Szervezetek</NavLink>
                        </li>
                        <li>
                            <NavLink to="/persons" onClick={closeHamMenu}>Sportolók</NavLink>
                        </li>
                        <li>
                            <NavLink to="/testtemplates" onClick={closeHamMenu}>Teszt sablonok</NavLink>
                        </li>
                        <li>
                            <NavLink to="/tests" onClick={closeHamMenu}>Tesztek</NavLink>
                        </li>
                        <li>
                            <NavLink to="/statistics" onClick={closeHamMenu}>Statisztikák</NavLink>
                        </li>
                    </ul>
                </div>
            </Fragment>
        </nav >
    )
}
