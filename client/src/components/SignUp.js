import React from 'react';

import Nav from './Nav';
import Footer from './Footer';
import '../stylesheets/SignUp.css';

const SignUp = () => {
  return (
    <div className="signup">
      <Nav />
      <div className="signup-container">
        <form action="http://localhost:3001/users" method="POST" className='signup-form'>
          <div className="form-inputs">
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" id="username" placeholder="Username" />
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" placeholder="Password" />
            <label htmlFor="confirm_password">Confirm Password: </label>
            <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password" />
          </div>
          <button className='signup-btn'>Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;