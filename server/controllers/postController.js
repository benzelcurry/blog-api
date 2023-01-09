const Post = require('../models/post');
const Comment = require('../models/comment');

const async = require('async');
const { body, validationResult } = require('express-validator');

// Return list of all blog posts
exports.post_list = function (req, res, next) {
  Post.find()
    .sort([['date_posted', 'descending']])
    .exec(function (err, list_posts) {
      if (err) {
        return next(err);
      }
      res.json({ post_list: list_posts });
    });
};

// Return details for a single blog post
exports.post_detail = (req, res, next) => {
  async.parallel(
    {
      post(callback) {
        Post.findById(req.params.id).exec(callback);
      },
      post_comments(callback) {
        Comment.find({ parent_post: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        // Error in API usage
        return next(err);
      }
      if (results.post === null) {
        // No blog posts with matching ID
        const err = new Error('Blog post not found');
        err.status = 404;
        return next(err);
      }
      // Successful, so return necessary data
      res.json({
        post: results.post,
        comments: results.post_comments,
        total_comments: results.post_comments.length,
      });
    },
  );
};

// Create a blog post on POST
exports.create_post = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Please enter a title')
    .isLength({ maxLength: 100 })
    .withMessage('Title must be under 100 characters'),
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Post contents must not be empty')
    .isLength({ max: 10000 })
    .withMessage('Post contents must be under 10,000 characters'),
  
  // Process request after validation
  (req, res, next) => {
    const errors = validationResult(req);

    // Might need to change how author info is grabbed once client is built
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      date_posted: new Date(),
      author: req.body.userID,
      published: true,
    });

    if (!errors.isEmpty()) {
      // Might need to update this to properly send errors to client
      res.json({
        errors: errors.array(),
      });
      return;
    }

    // Will probably want to edit to include meaningful content in the response
    post.save((err) => {
      if (err) { return next(err) };
      res.json('Post successfully created.');
    });
  },
];