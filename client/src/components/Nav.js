// Navbar component

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalState } from '../state';
import axios from 'axios';

import '../stylesheets/Nav.css';

const Nav = () => {
  const [user, setUser] = useState();
  const token = sessionStorage.getItem('token');

  const navigate = useNavigate();

  useEffect(() => {
    const body = { token: sessionStorage.getItem('token') }
    axios.post(`${process.env.REACT_APP_SERVER_URL}/`, body)
    .then((response) => {
      setUser(response.data.username);
    })
  }, [token])

  const handleClick = (e) => {
    sessionStorage.clear();
    navigate(0);
  }

  return (
    <div className='header'>
      <div className="buttons">
        <Link to={'/'}>
          <button className="site-title">Ben's Blog</button>
        </Link>
        {
          !user ?
          <div className="not-logged">
            <Link to={'/login'}>
              <button className='log-in'>Log In</button>
            </Link>
            <Link to={'/signup'}>
              <button className='sign-up'>Sign Up</button>
            </Link>
          </div>
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