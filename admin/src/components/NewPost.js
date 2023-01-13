import React from 'react';

import Nav from './Nav';
import Footer from './Footer';
import '../stylesheets/NewPost.css';

const NewPost = () => {
  return (
    <div className="new-post-container">
      <Nav />
      <div className="new-post">
        Hello, New Post!
      </div>
      <Footer />
    </div>
  );
};

export default NewPost;