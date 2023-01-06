const Post = require('../models/post');

const { body, validationResult } = require('express-validator');

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

    post.save((err) => {
      if (err) { return next(err) };
      // Might want to modify this once client is up and running
      res.json('Post successfully created.');
    });
  },
];