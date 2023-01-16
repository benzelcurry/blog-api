import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Nav from './Nav';
import Footer from './Footer';
import '../stylesheets/SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleUser = (e) => {
    setUsername(e.target.value);
  };

  const handlePass = (e) => {
    setPassword(e.target.value);
  };

  const handleConf = (e) => {
    setConfPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length === 0) {
      return setError('Please enter a username before submitting.');
    };
    if (password.length === 0 || confPass.length === 0) {
      return setError('Please ensure password fields are both filled out before submitting.');
    };
    const body = { username: username, password: password, confirm_password: confPass };
    axios.post('/users', body, { withCredentials: true })
      .then((response) => {
        console.log(response);
        if (response.data.errors) {
          if (typeof response.data.errors[0] === 'object') {
            return setError(response.data.errors[0].msg);
          } else {
            return setError(response.data.errors[0]);
          }
        }
        axios.post('/login', { username: username, password: password })
          .then((response) => {
            if (response.data.message === 'Successful') {
              navigate('/');
            }
          })
          .catch((err) => {
            throw new Error(err);
          });
      });
  };

  return (
    <div className="signup">
      <Nav />
      <div className="signup-container">
        <form action="http://localhost:3001/users" method="POST" className='signup-form'>
          <div className="form-inputs">
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" id="username" placeholder="Username" 
              onChange={(e) => handleUser(e)} 
            />
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" placeholder="Password" 
              onChange={(e) => handlePass(e)}
            />
            <label htmlFor="confirm_password">Confirm Password: </label>
            <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password" 
              onChange={(e) => handleConf(e)}
            />
          </div>
          <button className='signup-btn' onClick={(e) => handleSubmit(e)}>Submit</button>
          {
            error ? 
            <p className='signup-error'>{error}</p>
            : null
          }
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;