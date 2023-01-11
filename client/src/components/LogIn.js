import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

import Nav from './Nav';
import Footer from './Footer';
import '../stylesheets/LogIn.css';

const LogIn = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [success, setSuccess] = useState(false);

  const getToken = async (e) => {
    e.preventDefault();
    const body = { username: username, password: password };
    axios.post('/login', body)
      .then((response) => {
        // REMOVE CONSOLE.LOG BEFORE DEPLOYMENT
        console.log(response);
        setSuccess(true);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login-container">
      <Nav />
      {
        success ? 
        <Navigate to='/' />
        : null
      }
      <form action="http://localhost:3001/login" method="POST" className='login-form'>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input type="text" placeholder="Username" id='username' name='username'
            onChange={(e) => handleUsername(e)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input type="password" placeholder="Password" id='password' name='password'
            onChange={(e) => handlePassword(e)} />
        </div>
        <button onClick={(e) => getToken(e)}>Submit</button>
      </form>
      <Footer />
    </div>
  );
};

export default LogIn;