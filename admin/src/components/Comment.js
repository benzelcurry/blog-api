import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import axios from 'axios';

import Delete from '../images/delete.svg';
import '../stylesheets/Comment.css';

const Comment = ({ comment, author }) => {
  const [del, setDel] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleClick = () => {
    del ? setDel(false) : setDel(true);
  }

  const handleDelete = () => {
    axios.delete(`/comments/${comment._id}`)
      .then((response) => {
        if (response.data.message === 'Successful') {
          navigate(0);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
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
            <button className='del-btn' onClick={() => handleDelete()}>Yes</button>
            <button className='del-btn' onClick={() => handleClick()}>No</button>
          </div>
          { error ?
            { error }
            : null
          }
        </div>
        : null
      }
    </div>
  );
};

export default Comment;