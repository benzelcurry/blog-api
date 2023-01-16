import React from 'react';

import Nav from './Nav';
import Footer from './Footer';
import '../stylesheets/SignUp.css';

const SignUp = () => {
  return (
    <div className="signup">
      <Nav />
      <div className="signup-container">
        Stuff goes here.
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;