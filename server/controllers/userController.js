const User = require('../models/user');

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Return list of Users on GET
exports.user_list = (req, res, next) => {
  User.find()
    .sort([['username', 'ascending']])
    .exec((err, list_users) => {
      if (err) { return next(err) };
      res.json({ user_list: list_users });
    });
};

// Handle User creation on POST
exports.user_create_post = [
  // Validate and sanitize fields
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters')
    .isLength({ max: 16 })
    .withMessage('Username must be less than 16 characters')
    .isAlphanumeric()
    .withMessage('Username may only contain alphanumeric characters'),
  body('password')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Password field must not be empty'),
  body('confirm_password')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Password confirmation field must not be empty')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords must match'),

  // Process request after validation
  (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) { return next(err) };

      const errors = validationResult(req);

      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        account_created: new Date(),
        admin: false,
      });

      if (!errors.isEmpty()) {
        // Might need to update this to properly send errors to client
        res.json({
          errors: errors.array(),
        });
        return;
      }

      user.save((err) => {
        if (err) { return next(err) };
        // Might want to modify this once client is up and running
        res.json('Account successfully created.');
      });
    });
  },
];