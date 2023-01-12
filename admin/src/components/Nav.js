import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../stylesheets/Nav.css';

const Nav = () => {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(
      'http://localhost:3001/',
      { withCredentials: true },
    )
    .then((response) => {
      // REMOVE CONSOLE.LOG BEFORE DEPLOYMENT
      console.log(response.data);
      setUser(response.data.username);
    })
  }, [])

  const handleClick = (e) => {
    axios.get(
      '/logout/',
      { withCredentials: true },
    )
    .then((response) => {
      navigate(0);
    })
  }

  return (
    <div className="header">
      <div className="buttons">
        <Link to={'/'}>
          <button className="site-title">Ben's Blog</button>
        </Link>
        {
          !user ?
          <Link to={'/login'}>
            <button className='log-in'>Log In</button>
          </Link>
          :
          null
        }
        {
          user ? 
          <div className="user-buttons">
            <button>{user}</button>
            <button onClick={() => handleClick()}>Log Out</button>
          </div>
          :
          null
        }
      </div>
    </div>
  );
};

export default Nav;