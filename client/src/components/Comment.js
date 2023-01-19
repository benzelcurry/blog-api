import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import axios from 'axios';

import '../stylesheets/Comment.css';

const Comment = ({ comment }) => {
  const [author, setAuthor] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/users`)
    .then((response) => {
      const users = response.data.user_list;
      const commentAuthor = users.find(user => user._id === comment.author);
      setAuthor(commentAuthor.username);
    })
  })

  return (
    <div className="comment-container">
      <div className="comment-header">
        <div className="comment-author">{author}</div>
        <div className="comment-date">
          {DateTime.fromISO(comment.date_posted).toLocaleString(DateTime.DATE_MED)}
        </div>
      </div>
      <div className="comment-content">{ comment.content }</div>
    </div>
  );
};

export default Comment;