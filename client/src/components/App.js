import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

import '../stylesheets/App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetches posts from server and stores them in state
  useEffect(() => {
    fetch('http://localhost:3001/posts')
    .then((response) => response.json())
    .then((data) => {
      setPosts(data.post_list);
    });
  }, []);

  // Fetches users from server and stores them in state
  useEffect(() => {
    fetch('http://localhost:3001/users')
    .then((response) => response.json())
    .then((data) => {
      setUsers(data.user_list);
    });
  }, []);

  const displayAuthor = (author) => {
    if (users.length > 0) {
      const result = users.find(user => user._id === author);
      return result.username;
    }
  };

  return (
    // WILL WANT TO GATHER ICON .SVG'S FOR COMMENTS/WHOLE POST/ETC.
    <div className='app'>
      {posts.map((post) => 
        <div key={post._id} className='post-card'>
          <div className="card-info">
            <div className="card-title">{post.title}</div>
            <div className="card-date">
              {DateTime.fromISO(post.date_posted).toLocaleString(DateTime.DATE_MED)}
            </div>
          </div>
          <div className="card-author">{displayAuthor(post.author)}</div>
          <div className="card-content">{post.content}</div>
        </div>
      )}
    </div>
  );
}

export default App;
