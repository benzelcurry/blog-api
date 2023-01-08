// Routing component
// Using Hash Router because regular React Router doesn't work with GH Pages(?)

import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import App from './App';

const RouteSwitch = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={ <App /> } />
      </Routes>
    </HashRouter>
  );
};

export default RouteSwitch;