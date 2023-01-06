const express = require('express');
const router = express.Router();

// Require controller modules
const post_controller = require('../controllers/postController');
const user_controller = require('../controllers/userController');

// GET home page
router.get('/', (req, res) => {
  res.json(req);
});


//// BLOG POST ROUTES /////

// GET list of blog posts
router.get('/posts', post_controller.post_list);


///// USER ROUTES /////

// POST request for creating new user
router.post('/users', user_controller.user_create_post);

module.exports = router;