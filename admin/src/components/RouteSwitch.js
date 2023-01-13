import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import LogIn from './LogIn';
import Posts from './Posts';
import PostDetail from './PostDetail';
import NewPost from './NewPost';

const RouteSwitch = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={ <App /> } />
        <Route path='/login' element={ <LogIn /> } />
        <Route path='/posts' element={ <Posts /> } />
        <Route path='/posts/:id' element={ <PostDetail /> } />
        <Route path='/new-post' element={ <NewPost /> } />
      </Routes>
    </HashRouter>
  );
};

export default RouteSwitch;