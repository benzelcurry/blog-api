import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import LogIn from './LogIn';
import Posts from './Posts';

const RouteSwitch = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={ <App /> } />
        <Route path='/login' element={ <LogIn /> } />
        <Route path='/posts' element={ <Posts /> } />
      </Routes>
    </HashRouter>
  );
};

export default RouteSwitch;