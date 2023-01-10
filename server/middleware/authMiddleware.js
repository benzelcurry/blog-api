const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const async = require('async');
const User = require('../models/user');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || '';

  try {
    if (!token) {
      next();
    }
    const decrypt = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = {
      username: decrypt.username,
      id: decrypt.id,
    };
    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

// const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       // Get token from header
//       token = req.headers.authorization.split(' ')[1];

//       // Verify token
//       const decoded = jwt.verify(token, process.env.SECRET_KEY);

//       // Get user from the token
//       req.user = await User.findById(decoded.id);

//       next();
//     } catch (error) {
//       console.log(error);
//       res.status(401);
//       throw new Error('Not authorized');
//     }
//   }

//   if (!token) {
//     res.status(401);
//     throw new Error('Not authorized, no token');
//   }
// })

module.exports = verifyToken;