const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Require controller modules
const post_controller = require('../controllers/postController');
const user_controller = require('../controllers/userController');
const comment_controller = require('../controllers/commentController');

// Test if user is logged in
router.get('/', (req, res) => {
  // if (req.cookies.token) {
  //   const decrypt = jwt.verify(token, process.env.SECRET_KEY);
  //     res.json({
  //       username: decrypt.username,
  //       id: decrypt.id,
  //     });
  // } else {
  //   res.json('');
  // }
});


//// BLOG POST ROUTES /////

// GET list of blog posts
router.get('/posts', post_controller.post_list);

// POST request for creating new blog post
router.post('/posts', post_controller.create_post);

// GET request for blog post details
router.get('/posts/:id', post_controller.post_detail);

// PUT request for updating blog post
router.put('/posts/:id', post_controller.update_post);


///// USER ROUTES /////

// GET request for returning list of users
router.get('/users', user_controller.user_list);

// POST request for creating new user
router.post('/users', user_controller.user_create_post);


///// COMMENT ROUTES /////
// Might think about changing the path for comments to fall under posts

// POST request for creating new comment
router.post('/comments', comment_controller.create_comment);

// DELETE request for deleting comments (restricted to admins)
router.delete('/comments/:id', comment_controller.delete_comment);


///// LOG-IN ROUTE /////
router.post('/login', user_controller.login_user);


module.exports = router;