
import Login from '../Login/Login';
import HomePage from '../Homepage/Homepage';
import React, { useState, useEffect } from 'react';
import PAGES from '../../Static/Pages';


function Router({ currentPage, setCurrentPage, user, setUser, token, setToken }) {
  // const [currentPage, setCurrentPage] = useState(PAGES.homePage);
  useEffect(() => {
  }, []) // empty array means it only run once

  if (currentPage === PAGES.login) {
    return <Login token={token} setToken={setToken} user={user} setUser={setUser} setCurrentPage={setCurrentPage} currentPage={currentPage} />
  }
  if (currentPage === PAGES.homePage) {
    return <HomePage user={user} setCurrentPage={setCurrentPage}/>
  }
}

export default Router;