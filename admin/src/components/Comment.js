import React, { useState } from 'react';
import { DateTime } from 'luxon';

import Delete from '../images/delete.svg';
import '../stylesheets/Comment.css';

const Comment = ({ comment, author }) => {
  const [del, setDel] = useState(false);

  const handleClick = () => {
    del ? setDel(false) : setDel(true);
  }

  return (
    <div className="comment-container">
      <div className="comment-header">
        <div className="comment-author">{ author }</div>
        <div className="comment-date">
          {DateTime.fromISO(comment.date_posted).toLocaleString(DateTime.DATE_MED)}
        </div>
      </div>
      <div className="comment-content">{ comment.content }</div>
      <i className='delete-icon' onClick={() => handleClick()}>
        <img src={Delete} alt="Delete comment" className='delete' />
      </i>
      {
        del ?
        <div className="deletion-prompt">
          <p>Are you sure you want to delete this comment?</p>
          <div>
            <button className='del-btn'>Yes</button>
            <button className='del-btn' onClick={() => handleClick()}>No</button>
          </div>
        </div>
        : null
      }
    </div>
  );
};

export default Comment;