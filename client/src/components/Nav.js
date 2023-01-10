// Navbar component

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../stylesheets/Nav.css';

const Nav = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    axios.get(
      'http://localhost:3001/', 
      { withCredentials: true },
    )
      .then((response) => {
        console.log(response.data);
        setUser(response.data.username);
      })
  }, [])

  return (
    <div className='header'>
      <div className="buttons">
        <Link to={'/'}>
          <button className="site-title">Ben's Blog</button>
        </Link>
        <Link to={'/login'}>
          <button className='log-in'>Log In</button>
        </Link>
        {
          user ? 
          <button>{user}</button>
          :
          <button>Nope</button>
        }
      </div>
    </div>
  );
};

export default Nav;