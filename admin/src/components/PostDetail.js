// Displays individual blog posts and handles adding comments

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import axios from 'axios';

import Nav from './Nav';
import Footer from './Footer';
import AccessDenied from './AccessDenied';
import Comment from './Comment';
import '../stylesheets/PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const [author, setAuthor] = useState();
  const [admin, setAdmin] = useState(false);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`)
    .then((response) => {
      setPost(response.data.post);
      setComments(response.data.comments);
    });
  }, [id]);

  // Gets current logged in user data
  // useEffect(() => {
  //   axios.get(
  //     'http://localhost:3001/', 
  //     { withCredentials: true },
  //   )
  //   .then((response) => {
  //     setUser(response.data.id);
  //     setAdmin(response.data.admin);
  //   })
  // }, [])

  // Gets current logged in user data
  useEffect(() => {
    const body = { token: sessionStorage.getItem('token') }
    axios.post(`${process.env.REACT_APP_SERVER_URL}/`, body)
    .then((response) => {
      if (response.data.admin === true) {
        setUser(response.data.id);
        setAdmin(response.data.admin)
      }
    })
  }, [])

  // Fetches users from server and stores them in state
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/users`)
    .then((response) => {
      setUsers(response.data.user_list);
    });
  }, []);

  // Gets username of post author
  useEffect(() => {
    const displayAuthor = (author) => {
      if (users.length > 0) {
        const result = users.find(user => user._id === author);
        if (result) {
          return result.username;
        }
      }
    };

    setAuthor(displayAuthor(post.author));
  }, [post.author, users]);

  // Handles input for comments
  const handleTyping = (e) => {
    setContent(e.target.value);
  }

  // Handles submitting new comments on POST
  const postComment = async (e) => {
    e.preventDefault();
    if (content.length === 0) {
      return setError('Please enter a comment before hitting submit');
    }
    const body = { content: content, userID: user, postID: id };
    axios.post(`${process.env.REACT_APP_SERVER_URL}/comments`, body)
      .then((response) => {
        if (response.data.message === 'Successful') {
          navigate(0);
        } else {
          setError(response.data.errors[0].msg);
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <div className='blog-post'>
      <Nav />
      {
        admin ?
        <div className='post'>
          <div className="post-details">
            <h1 className="post-title">{post.title}</h1>
            <h3 className="post-author">{author}</h3>
            <h4 className="post-date">
              {DateTime.fromISO(post.date_posted).toLocaleString(DateTime.DATE_MED)}
            </h4>
            <p className="post-content">{post.content}</p>
          </div>

          <div className="comment-prompt">
            <h4>Leave a Comment...</h4>
            <form action="http://localhost:3001/comments" method="POST" className="comment-form">
              <textarea
                onChange={(e) => handleTyping(e)}
                placeholder='Leave a comment... (max: 500 chars)'
                maxLength={500}
                rows={5}
                cols={50}>
              </textarea>
              <i>{500 - content.length} characters remaining</i>
              <button className='submit-comment' onClick={(e) => postComment(e)}>Submit Comment</button>
            </form>
            {
              error ?
              <i>{error}</i>
              : null
            }
          </div>

          <div className="post-comments">
            <h4 className='comments-header'>Comments:</h4>
            {comments.map((comment) =>
              <Comment key={comment._id} comment={comment} />
            )}
          </div>
        </div>
        : <AccessDenied />
      }
      <Footer />
    </div>
  );
};

export default PostDetail;