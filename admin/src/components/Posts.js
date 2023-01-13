// Old Posts component

import React, { useState, useEffect } from 'react';

import Card from './Card';
import Nav from './Nav';
import Footer from './Footer';
import '../stylesheets/App.css';

const Posts = () => {
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

  return (
    // WILL WANT TO GATHER ICON .SVG'S FOR COMMENTS/WHOLE POST/ETC.
    <div className="app">
      <Nav />
      <div className='posts'>
        {posts.map((post) => 
          <Card key={post._id} users={users} post={post} />  
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Posts;
