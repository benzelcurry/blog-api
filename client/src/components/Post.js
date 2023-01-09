import React from 'react';

import Nav from './Nav';
import Footer from './Footer';
import '../stylesheets/Post.css';

// FLESH THIS COMPONENT OUT TO SHOW POST DETAILS
const Post = () => {
  return (
    <div className='blog-post'>
      <Nav />
      <div className='post'>Hello, World!</div>
      <Footer />
    </div>
  );
};

export default Post;