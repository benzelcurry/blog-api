const User = require('../models/user');

const { body, validationResult } = require('express-validator');
const async = require('async');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

  // MAKE SURE LINES 44 THRU 55 WORK FOR CHECKING EXISTING USERNAMES; ELSE, DELETE
  (req, res, next) => {
    async.parallel({
      user(callback) {
        User.findOne({ username: req.body.username }).exec(callback);
      },
    },
    (err, results) => {
      if (results.user) {
        return res.json({
          errors: ['Username already exists']
        })
      }

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
      },
    )}
  )}
];

// Handle User login on POST
exports.login_user = (req, res, next) => {
  async.parallel(
    {
      user(callback) {
        User.findOne({ username: req.body.username }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        // Error in API usage
        return next(err);
      }
      if (!results.user) {
        // No user with matching username found
        const err = new Error(`Username does not exist`);
        // err.status = 401;
        // return next(err);
        res.json({
          error: 'Username does not exist'
        });
        return next(err);
      }
      bcrypt.compare(req.body.password, results.user.password, (err, isValid) => {
        if (isValid) {
          const secret = process.env.SECRET_KEY;
          const token = jwt.sign( 
            { 
              username: req.body.username, 
              id: results.user._id,
              admin: results.user.admin,
            },
            secret, 
            { expiresIn: '30d' },
          );

          res.cookie('token', token, { secure: false, httpOnly: true });

          return res.status(200).json({
            message: 'Successful',
            admin: results.user.admin,
            token,
          });
        } else {
          // res.status(401).json('Authentication Failed');
          res.json({
            error: 'Incorrect password'
          });
        }
      })
    }
  );
}