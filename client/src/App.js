import React, { useState, useEffect } from 'react';

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
    <div>
      {posts.map((post) => 
        <div key={post._id}>{post.content}</div>
      )}
    </div>
  );
}

export default App;
