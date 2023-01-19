// Component for creating/updating blog posts

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

  // Handles input change on title field
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  // Handles input change on content field
  const handleTyping = (e) => {
    setContent(e.target.value);
  };

  // Sets state for post-related data if page is loaded for a post update
  useEffect(() => {
    if (location.state) {
      setPost(location.state.post);
      setTitle(location.state.post.title);
      setContent(location.state.post.content);
    }
  }, [location.state])

  // Sets current user data if they're an admin
  // useEffect(() => {
  //   axios.get(
  //     'http://localhost:3001/',
  //     { withCredentials: true },
  //   )
  //   .then((response) => {
  //     if (response.data.admin === true) {
  //       setUser(response.data);
  //     }
  //   })
  // }, [])

  useEffect(() => {
    const body = { token: sessionStorage.getItem('token') }
    axios.post(`${process.env.REACT_APP_SERVER_URL}/`, body)
    .then((response) => {
      if (response.data.admin === true) {
        setUser(response.data);
      }
    })
  }, [])

  // Handles submitting and saving *new* post on POST
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length === 0) {
      return setError('Please enter a title for your post before submitting.');
    }
    if (content.length === 0) {
      return setError('Please enter a body for your post before submitting.');
    }
    const body = { title: title, content: content, userID: user.id };
    axios.post(`${process.env.REACT_APP_SERVER_URL}/posts`, body)
    .then((response) => {
      if (response.data.errors) {
        return setError(response.data.errors[0].msg);
      }
      navigate('/posts');
    })
    .catch((err) => {
      throw new Error(err);
    });
  };

  // Handles updating *old* post on PUT
  const handleUpdate = (e) => {
    e.preventDefault();
    if (title.length === 0) {
      return setError('Please enter a title for your post before submitting.');
    }
    if (content.length === 0) {
      return setError('Please enter a body for your post before submitting.');
    }
    const body = { title: title, content: content, userID: user.id, updated: new Date() };
    axios.put(`${process.env.REACT_APP_SERVER_URL}/posts/${post._id}`, body)
    .then((response) => {
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
          <form action="" method="POST">
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