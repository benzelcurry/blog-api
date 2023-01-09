import React from 'react';

import Nav from './Nav';
import Footer from './Footer';
import '../stylesheets/LogIn.css';

const LogIn = () => {
  return (
    <div className="login-container">
      <Nav />
      <form action="localhost:3001/login" method="POST" className='login-form'>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input type="text" placeholder="Username" id='username' />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input type="password" placeholder="Password"/>
        </div>
        <button>Submit</button>
      </form>
      <Footer />
    </div>
  );
};

export default LogIn;