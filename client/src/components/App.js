import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

import '../stylesheets/App.css';

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/posts')
    .then((response) => response.json())
    .then((data) => {
      setPosts(data.post_list);
    });
    console.log(posts);
  }, []);

  return (
    <div className='app'>
      {posts.map((post) => 
        <div key={post._id} className='post-card'>
          <div className="card-title">{post.title}</div>
          <div className="card-author">{post.author}</div>
          <div className="card-date">
            {DateTime.fromISO(post.date_posted).toLocaleString(DateTime.DATE_MED)}
          </div>
          <div className="card-content">{post.content}</div>
        </div>
      )}
    </div>
  );
}

export default App;
