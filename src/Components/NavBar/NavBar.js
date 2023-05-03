import React from 'react';
import "./NavBar.css"
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const NavigationBar = () => {
    const [cookies, setCookie] = useCookies(['username', 'userId'])

    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/feed">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/profile/${cookies.username}`}>
                        Profile
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/connections`}>
                        Connections
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavigationBar;