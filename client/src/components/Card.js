// Component for displaying blog post previews on home page

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import axios from 'axios';

import '../stylesheets/Card.css';
import Comment from '../images/comment.svg';

const Card = ({ users, post }) => {
  const [author, setAuthor] = useState();
  const [comments, setComments] = useState();
  const myData = {author: author, users: users};

  // Gets number of comments on post
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/posts/${post._id}`)
    .then((response) => {
      setComments(response.data.total_comments)
    });
  }, [comments, post._id]);

  // Gets username of post author
  useEffect(() => {
    const displayAuthor = (author) => {
      if (users.length > 0) {
        const result = users.find(user => user._id === author);
        return result.username;
      }
    };
    setAuthor(displayAuthor(post.author));
  }, [post.author, users]);

  return (
    <div key={post._id} className='post-card'>
      <div className="card-info">
        <div className="card-title">{post.title}</div>
        <div className="card-date">
          {DateTime.fromISO(post.date_posted).toLocaleString(DateTime.DATE_MED)}
        </div>
      </div>
      <div className="card-author">{author}</div>
      <div className="card-content">{post.content}</div>
      <Link to={ `/post/${post._id}` } state={myData} className='post-link'>
        <i className='more-info'>
          <div>{comments}</div>
          <img src={Comment} alt='Comments' className='comment' />
        </i>
      </Link>
    </div>
  );
};

export default Card;