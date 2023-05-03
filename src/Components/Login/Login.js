import React, { useEffect, useState } from 'react';
import './Login.css';
import axios from 'axios';
import PAGES from '../../Static/Pages';
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

function Login({ navigate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookies] = useCookies(['username', 'userId', 'jwt']);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [goToFeed, setGoToFeed] = useState(false);

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
      setGoToFeed(true);
      navigate('/feed');

    } catch (error) {
      console.error(error.message);
      setInvalidLogin(true)
    }
    event.preventDefault();
    // TODO: handle form submission
  };

  function invalidLoginMessage() {
    if (invalidLogin) {
      return <p>Invalid username or password</p>
    }
  }

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
        <button onClick={handleSubmit}>Login</button>
        {invalidLoginMessage()}
      </div>
    </div>
  );
}

export default Login;
