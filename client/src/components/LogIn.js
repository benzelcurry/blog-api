import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useGlobalState } from '../state';

import Nav from './Nav';
import Footer from './Footer';
import '../stylesheets/LogIn.css';

const LogIn = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();
  const [token, setToken] = useGlobalState('token');

  const getToken = async (e) => {
    e.preventDefault();
    if (error) { setError('') }
    if (!username) {
      return setError('Please enter a username');
    }
    if (!password) {
      return setError('Please enter a password');
    }
    const body = { username: username, password: password };
    axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, body)
      .then((response) => {
        if (response.data.message === 'Successful') {
          // REMOVE CONSOLE.LOG BEFORE DEPLOYMENT
          console.log(response);
          setToken(response.data.token);
          window.sessionStorage.setItem('token', response.data.token);
          setSuccess(true);
        } else {
          setError(response.data.error);
        }
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
      <div className="login-body">
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
        { error ?
          <p className='login-error'>{error}</p>
          : null
        }
      </div>
      <Footer />
    </div>
  );
};

export default LogIn;