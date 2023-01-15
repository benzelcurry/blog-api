import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const [post, setPost] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleTyping = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (location.state) {
      setPost(location.state.post);
      setContent(location.state.post.content);
    }
    console.log('testing');
  }, [location.state])

  useEffect(() => {
    axios.get(
      'http://localhost:3001/',
      { withCredentials: true },
    )
    .then((response) => {
      if (response.data.admin === true) {
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

  const handleUpdate = (e) => {
    e.preventDefault();
    if (title.length === 0) {
      return setError('Please enter a title for your post before submitting.');
    }
    if (content.length === 0) {
      return setError('Please enter a body for your post before submitting.');
    }
    const body = { title: title, content: content, userID: user.id, updated: new Date() };
    axios.put(
      `http://localhost:3001/posts/${post._id}`,
      body,
      { withCredentials: true },
    )
    .then((response) => {
      console.log(response);
      if (response.data.errors) {
        return setError(response.data.errors[0].msg);
      }
      navigate(`/posts/${post._id}`);
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
                defaultValue={ post ? post.title : '' }
                placeholder="Title (max length: 100 chars)"
                onChange={(e) => handleTitle(e)} maxLength={100} />
              <label htmlFor="content">Post Content: </label>
              <div className="post-contents">
                <textarea
                  placeholder='Write your post body here...'
                  name="content" id="content"
                  maxLength={10000}
                  defaultValue={ post ? post.content : '' }
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
            <button className='create-btn' 
              onClick={ post ? (e) => handleUpdate(e) : (e) => handleSubmit(e)}>
                Create Post
            </button>
          </form>
        </div>
        : <AccessDenied />
      }
      <Footer />
    </div>
  );
};

export default NewPost;