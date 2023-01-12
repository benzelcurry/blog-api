import React from 'react';

import Nav from './Nav';
import Footer from './Footer';
import '../stylesheets/App.css';

const App = () => {
  return (
    <div className='page-container'>
      <Nav />
      <div className='app'>Hello, Admin!</div>
      <Footer />
    </div>
  );
};

export default App;