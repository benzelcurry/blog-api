import React from 'react';

import Nav from './Nav';
import Footer from './Footer';
import '../stylesheets/AccessDenied.css';

const AccessDenied = () => {
  return (
    <div className="access-denied">
      <Nav />
      <p>ACCESS DENIED - USER IS NOT AN ADMIN</p>
      <Footer />
    </div>
  );
};

export default AccessDenied;