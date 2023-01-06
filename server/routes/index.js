const express = require('express');
const router = express.Router();

// GET home page
router.get('/', (req, res) => {
  res.json('Hello, World!');
});

// GET test message
router.get('/test', (req, res) => {
  res.json("You've reached the test message!");
});

module.exports = router;