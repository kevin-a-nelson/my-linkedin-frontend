import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import PAGES from '../../Static/Pages';
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

function Login({ currentPage, setCurrentPage, setUser, token, setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookies] = useCookies(['username', 'userId', 'jwt']);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      const getToken = await axios.post('https://localhost:7227/api/Authentication/login', {
        "userName": username,
        "password": password,
      });

      setCookies('username', username, { path: '/' });
      const getUser = await axios.get(`https://localhost:7227/api/Users/username/${username}`);
      setCookies('userId', getUser.data.id, { path: '/' })
      setCookies('jwt', getToken.data.token, { path: '/' });

    } catch (error) {
      console.error(error.message);
    }
    event.preventDefault();
    // TODO: handle form submission
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Link to="/feed">
          <button onClick={handleSubmit}>Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
