import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

import '../stylesheets/Card.css';

const Card = ({ users, post }) => {
  const [author, setAuthor] = useState();

  useEffect(() => {
    const displayAuthor = (author) => {
      if (users.length > 0) {
        const result = users.find(user => user._id === author);
        return result.username;
      }
    };

    // console.log for checking for infinite rendering; delete before deployment
    console.log('Card hook');
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
    </div>
  );
};

export default Card;