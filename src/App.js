import './App.css';
import HomePage from './Components/Homepage/Homepage';
import Login from './Components/Login/Login';
import Profile from "./Components/Profile/Profile";
import NavBar from './Components/NavBar/NavBar';
import PAGES from './Static/Pages';
import React, { useState, useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(PAGES.login);
  const [token, setToken] = useState(null);

  return (
    <div className="App">
        <BrowserRouter>
          <NavBar />
          <div className='content'>
            <Routes>
              <Route path="/" element={<Login setUser={setUser} />} />
              <Route path="/feed" element={<HomePage />} />
              <Route path="/profile/:username" element={<Profile />} />
            </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
