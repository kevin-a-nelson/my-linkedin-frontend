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
                {/* <li className="nav-item">
                    <a href="#" className="nav-link">My Network</a>
                </li> */}
                {/* <li className="nav-item">
                    <a href="#" className="nav-link">Jobs</a>
                </li> */}
                {/* <li className="nav-item">
                    <a href="#" className="nav-link">Messaging</a>
                </li> */}
                {/* <li className="nav-item">
                    <a href="#" className="nav-link">Notifications</a>
                </li> */}
                <li className="nav-item">
                    <Link to={`/profile/${cookies.username}`}>
                        <a href="#" className="nav-link">My Profile</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavigationBar;