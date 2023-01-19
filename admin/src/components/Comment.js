import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import axios from 'axios';

import Delete from '../images/delete.svg';
import '../stylesheets/Comment.css';

const Comment = ({ comment }) => {
  const [del, setDel] = useState(false);
  const [error, setError] = useState('');
  const [author, setAuthor] = useState('');

  const navigate = useNavigate();

  const handleClick = () => {
    del ? setDel(false) : setDel(true);
  }

  const handleDelete = () => {
    axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/comments/${comment._id}`, 
      { data: { token: sessionStorage.getItem('token') } }
    )
      .then((response) => {
        console.log(response);
        if (response.data.message === 'Successful') {
          navigate(0);
        } else {
          console.log(response);
          setError(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });
  }

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