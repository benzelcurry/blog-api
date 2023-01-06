const express = require('express');
const router = express.Router();

// Require controller modules
const post_controller = require('../controllers/postController');
const user_controller = require('../controllers/userController');
const comment_controller = require('../controllers/commentController');

// GET home page
router.get('/', (req, res) => {
  res.json(req);
});


//// BLOG POST ROUTES /////

// GET list of blog posts
router.get('/posts', post_controller.post_list);

// POST request for creating new blog post
router.post('/posts', post_controller.create_post);


///// USER ROUTES /////

// POST request for creating new user
router.post('/users', user_controller.user_create_post);


///// COMMENT ROUTES /////
// Might think about changing the path for comments to fall under posts

// POST request for creating new comment
router.post('/comments', comment_controller.create_comment);

module.exports = router;