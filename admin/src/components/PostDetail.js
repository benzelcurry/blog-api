import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
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
  const [admin, setAdmin] = useState(false);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState();
  const location = useLocation();
  const myData = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/posts/${id}`)
    .then((response) => response.json())
    .then((data) => {
      setPost(data.post);
      setComments(data.comments);
    });

    // Checks for infinite rendering; delete before deployment
    console.log('infinite post check');
  }, [id]);

  useEffect(() => {
    axios.get(
      'http://localhost:3001/', 
      { withCredentials: true },
    )
    .then((response) => {
      // REMOVE CONSOLE.LOG BEFORE DEPLOYMENT
      console.log(response.data);
      setUser(response.data.id);
      setAdmin(response.data.admin);
    })
  }, [])

  const handleTyping = (e) => {
    setContent(e.target.value);
  }

  const postComment = async (e) => {
    e.preventDefault();
    if (content.length === 0) {
      return setError('Please enter a comment before hitting submit');
    }
    const body = { content: content, userID: user, postID: id };
    axios.post('/comments', body)
      .then((response) => {
        if (response.data.message === 'Successful') {
          // REMOVE CONSOLE.LOG BEFORE DEPLOYMENT
          console.log(response);
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
          <h1 className="post-title">{post.title}</h1>
          <h3 className="post-author">{post.author}</h3>
          <h4 className="post-date">
            {DateTime.fromISO(post.date_posted).toLocaleString(DateTime.DATE_MED)}
          </h4>
          <p className="post-content">{post.content}</p>

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
              <Comment key={comment._id} comment={comment} author={myData.author} />
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