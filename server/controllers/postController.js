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