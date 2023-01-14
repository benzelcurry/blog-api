import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Nav from './Nav';
import Footer from './Footer';
import AccessDenied from './AccessDenied';
import '../stylesheets/NewPost.css';

const NewPost = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [user, setUser] = useState({});
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleTyping = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    axios.get(
      'http://localhost:3001/',
      { withCredentials: true },
    )
    .then((response) => {
      if (response.data.admin === true) {
        console.log('running...');
        console.log(response.data);
        setUser(response.data);
      }
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length === 0) {
      return setError('Please enter a title for your post before submitting.');
    }
    if (content.length === 0) {
      return setError('Please enter a body for your post before submitting.');
    }
    const body = { title: title, content: content, userID: user.id };
    axios.post(
      'http://localhost:3001/posts', 
      body,
      { withCredentials: true }
    )
    .then((response) => {
      console.log(response);
      if (response.data.errors) {
        return setError(response.data.errors[0].msg);
      }
      navigate('/posts');
    })
    .catch((err) => {
      throw new Error(err);
    });
  };

  return (
    <div className="new-post-container">
      <Nav />
      {
        user.admin ?
        <div className="new-post">
          <h1>Write A New Post</h1>
          <form action="http://localhost:3001/posts" method="POST">
            <div className="post-form">
              <label htmlFor="title">Title: </label>
              <input type="text" name="title" id="title" 
                placeholder="Title (max length: 100 chars)" 
                onChange={(e) => handleTitle(e)} maxLength={100} />
              <label htmlFor="content">Post Content: </label>
              <div className="post-contents">
                <textarea
                  placeholder='Write your post body here...'
                  name="content" id="content"
                  maxLength={10000}
                  onChange={(e) => handleTyping(e)}>
                </textarea>
                <i>{10000 - content.length} characters remaining</i>
              </div>
            </div>
            {
              error ? 
              <p className='error-msg'>{error}</p>
              : null
            }
            <button className='create-btn' onClick={(e) => handleSubmit(e)}>Create Post</button>
          </form>
        </div>
        : <AccessDenied />
      }
      <Footer />
    </div>
  );
};

export default NewPost;