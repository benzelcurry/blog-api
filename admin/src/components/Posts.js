// Old Posts component

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from './Card';
import AccessDenied from './AccessDenied';
import Nav from './Nav';
import Footer from './Footer';
import '../stylesheets/Posts.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState(false);

  // Fetches posts from server and stores them in state
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`)
    .then((response) => {
      setPosts(response.data.post_list);
    });
  }, []);

  // Fetches users from server and stores them in state
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/users`)
    .then((response) => {
      setUsers(response.data.user_list);
    });
  }, []);

  // // Checks to see if current user is an admin
  // useEffect(() => {
  //   axios.get(
  //     'http://localhost:3001/',
  //     { withCredentials: true },
  //   )
  //   .then((response) => {
  //     if (response.data.admin === true) {
  //       setAdmin(response.data.admin);
  //     }
  //   })
  // }, [])

  // Checks to see if current user is an admin
  useEffect(() => {
    const body = { token: sessionStorage.getItem('token') }
    axios.post(`${process.env.REACT_APP_SERVER_URL}/`, body)
    .then((response) => {
      if (response.data.admin === true) {
        setAdmin(response.data.admin);
      }
    })
  }, [])

  return (
    <div className="posts-container">
      <Nav />
      {
        admin ?
        <div className='posts'>
          {posts.map((post) => 
            <Card key={post._id} users={users} post={post} />  
          )}
        </div>
        : <AccessDenied />
      }
      <Footer />
    </div>
  );
}

export default Posts;
