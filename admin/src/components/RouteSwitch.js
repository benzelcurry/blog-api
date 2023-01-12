import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import App from './App';
import LogIn from './LogIn';

const RouteSwitch = () => {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    axios.get(
      'http://localhost:3001/',
      { withCredentials: true },
    )
    .then((response) => {
      // REMOVE CONSOLE.LOG BEFORE DEPLOYMENT
      console.log(response.data);
      setAdmin(response.data.admin);
    })
  }, [])

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={ <App /> } />
        <Route path='/login' element={ <LogIn /> } />
      </Routes>
    </HashRouter>
  );
};

export default RouteSwitch;