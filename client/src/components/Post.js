import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { DateTime } from 'luxon';

import Nav from './Nav';
import Footer from './Footer';
import '../stylesheets/Post.css';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const location = useLocation();
  const author = location.state;

  useEffect(() => {
    fetch(`http://localhost:3001/posts/${id}`)
    .then((response) => response.json())
    .then((data) => {
      setPost(data.post);
    });

    // Checks for infinite rendering; delete before deployment
    console.log('infinite post check');
  }, [author, id]);

  return (
    <div className='blog-post'>
      <Nav />
      <div className='post'>
        <div className="post-title">{post.title}</div>
        <div className="post-author">{author}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Post;