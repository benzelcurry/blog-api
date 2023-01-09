import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { DateTime } from 'luxon';

import Nav from './Nav';
import Footer from './Footer';
import Comment from './Comment';
import '../stylesheets/Post.css';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const location = useLocation();
  const myData = location.state;

  useEffect(() => {
    fetch(`http://localhost:3001/posts/${id}`)
    .then((response) => response.json())
    .then((data) => {
      setPost(data.post);
      setComments(data.comments);
    });

    // Checks for infinite rendering; delete before deployment
    console.log('infinite post check');
  }, [myData.author, id]);

  return (
    <div className='blog-post'>
      <Nav />
      <div className='post'>
        <h1 className="post-title">{post.title}</h1>
        <h3 className="post-author">{myData.author}</h3>
        <h4 className="post-date">
          {DateTime.fromISO(post.date_posted).toLocaleString(DateTime.DATE_MED)}
        </h4>
        <p className="post-content">{post.content}</p>
        <div className="post-comments">
          <h4 className='comments-header'>Comments:</h4>
          {comments.map((comment) =>
            <Comment key={comment._id} comment={comment} author={myData.author} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Post;