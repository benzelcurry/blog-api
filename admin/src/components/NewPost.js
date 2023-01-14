import React, { useState, useEffect } from 'react';

import Nav from './Nav';
import Footer from './Footer';
import '../stylesheets/NewPost.css';
import { isContentEditable } from '@testing-library/user-event/dist/utils';

const NewPost = () => {
  const [content, setContent] = useState('');

  const handleTyping = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="new-post-container">
      <Nav />
      <div className="new-post">
        <h1>Write A New Post</h1>
        <form action="http://localhost:3001/posts" method="POST">
          <div className="post-form">
            <label htmlFor="title">Title: </label>
            <input type="text" name="title" id="title" placeholder="Title" />
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
          <button className='create-btn'>Create Post</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default NewPost;