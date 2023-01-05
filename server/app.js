const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const compression = require('compression');
const helmet = require('helmet');
const mongoose = require('mongoose');

require('dotenv').config();

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

const app = express();

app.use(helmet());
app.use(compression());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(process.env.PORT, () => console.log(`Listening on Port ${process.env.PORT}`));