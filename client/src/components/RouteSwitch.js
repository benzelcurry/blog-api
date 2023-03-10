// Routing component
// Using Hash Router because regular React Router doesn't work with GH Pages(?)

import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Post from './Post';
import LogIn from './LogIn';
import SignUp from './SignUp';

const RouteSwitch = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={ <App /> } />
        <Route path='/post/:id' element={ <Post /> } />
        <Route path='/login' element={ <LogIn /> } />
        <Route path='/signup' element={ <SignUp /> } />
      </Routes>
    </HashRouter>
  );
};

export default RouteSwitch;