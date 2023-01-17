import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Nav from './Nav';
import Footer from './Footer';
import AccessDenied from './AccessDenied';
import '../stylesheets/App.css';

const App = () => {
  const [admin, setAdmin] = useState(false);
  const [username, setUsername] = useState();

  useEffect(() => {
    axios.get(
      'http://localhost:3001/',
      { withCredentials: true },
    )
    .then((response) => {
      if (response.data.admin === true) {
        setAdmin(response.data.admin);
        setUsername(response.data.username);
      }
    })
  }, [])

  return (
    <div className='page-container'>
      <Nav />
      {
        admin ?
        <div className="app">
          <h1 className='greeting'>Welcome to your admin dashboard, {username}!</h1>
          <Link to={'/new-post'}><button className='btn'>Create New Post</button></Link>
          <Link to={'/posts'}><button className='btn'>View Old Posts</button></Link>
        </div>
        : <AccessDenied />
      }
      <Footer />
    </div>
  );
};

export default App;