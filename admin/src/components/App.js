import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Nav from './Nav';
import Footer from './Footer';
import AccessDenied from './AccessDenied';
import '../stylesheets/App.css';

const App = () => {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    axios.get(
      'http://localhost:3001/',
      { withCredentials: true },
    )
    .then((response) => {
      if (response.data.admin === true) {
        setAdmin(response.data.admin);
      }
    })
  }, [])

  return (
    <div className='page-container'>
      <Nav />
      {
        admin ?
        <div className='app'>Hello, Admin!</div>
        : <AccessDenied />
      }
      <Footer />
    </div>
  );
};

export default App;