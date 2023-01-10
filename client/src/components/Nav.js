// Navbar component

import React from 'react';
import { Link } from 'react-router-dom';

import '../stylesheets/Nav.css';

const Nav = () => {
  return (
    <div className='header'>
      <div className="buttons">
        <Link to={'/'}>
          <button className="site-title">Ben's Blog</button>
        </Link>
        <Link to={'/login'}>
          <button className='log-in'>Log In</button>
        </Link>
      </div>
    </div>
  );
};

export default Nav;