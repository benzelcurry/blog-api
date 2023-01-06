const Comment = require('../models/comment');

const { body, validationResult } = require('express-validator');

exports.create_comment = [
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Comment field must not be empty')
    .isLength({ max: 500 })
    .withMessage('Comments must be under 500 characters'),

  // Process request after validation
  (req, res, next) => {
    const errors = validationResult(req);

    // Might need to change how author and parent post are fetched after
    // client is built
    const comment = new Comment({
      content: req.body.content,
      date_posted: new Date(),
      author: req.body.userID,
      parent_post: req.body.postID,
    });

    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
      });
      return;
    }

    // Will probably want to edit to include meaningful content in the response
    comment.save((err) => {
      if (err) { return next(err) };
      res.json('Comment successfully created');
    });
  },
];