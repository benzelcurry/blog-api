import React from 'react';
import { useParams } from 'react-router-dom';

import Nav from './Nav';
import Footer from './Footer';
import '../stylesheets/Post.css';

const Post = () => {
  const { id } = useParams();

  return (
    <div className='blog-post'>
      <Nav />
      <div className='post'>{ id }</div>
      <Footer />
    </div>
  );
};

export default Post;