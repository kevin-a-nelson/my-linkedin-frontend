import './App.css';
import HomePage from './Components/Homepage/Homepage';
import Login from './Components/Login/Login';
import Profile from "./Components/Profile/Profile";
import NavBar from './Components/NavBar/NavBar';
import PAGES from './Static/Pages';
import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";

import { useNavigate } from 'react-router-dom';
import Connections from './Components/Connections/Connections';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(PAGES.login);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  return (
    <div className="App">
      <NavBar />
      <div className='content'>
        <Routes>
          <Route path="/" element={<Login setUser={setUser} navigate={navigate} />} />
          <Route path="/feed" element={<HomePage />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/connections" element={<Connections />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
