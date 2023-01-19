const Comment = require('../models/comment');

const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

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
      res.json({
        message: 'Successful'
      });
    });
  },
];

// Delete comment on DELETE request
exports.delete_comment = (req, res, next) => {
  const decrypt = jwt.verify(req.body.token, process.env.SECRET_KEY);
  const isAdmin = decrypt.admin;

  if (isAdmin) {
    Comment.findByIdAndRemove(req.params.id, (err) => {
      if (err) { return res.json({ message: 'Error' }) };
      res.json({ message: 'Successful' });
    });
  } else {
    res.json({ message: 'Error' });
  }
};