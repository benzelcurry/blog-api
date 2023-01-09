import React from 'react';
import { DateTime } from 'luxon';

import '../stylesheets/Comment.css';

const Comment = ({ comment, author }) => {
  return (
    <div className="comment-container">
      <div className="comment-header">
        <div className="comment-author">{ author }</div>
        <div className="comment-date">
          {DateTime.fromISO(comment.date_posted).toLocaleString(DateTime.DATE_MED)}
        </div>
      </div>
      <div className="comment-content">{ comment.content }</div>
    </div>
  );
};

export default Comment;