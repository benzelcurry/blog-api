const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const compression = require('compression');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const verifyToken = require('./middleware/authMiddleware');
// const jwt = require('express-jwt');
// const jsonwebtoken = require('jsonwebtoken');
const jwt = require('jsonwebtoken');

const indexRouter = require('./routes/index');

require('dotenv').config();

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

const app = express();

app.use(cors({ credentials: true }));
app.use(helmet());
app.use(compression());
app.use(cookieParser());
// app.use(jwt({
//   secret: process.env.SECRET_KEY,
//   algorithms: ['HS256'],
//   getToken: req => req.cookies.token
// }));
// app.use(verifyToken);
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Verifies token and returns necessary info to client
app.get('/', (req, res) => {
  if (req.cookies.token) {
    const decrypt = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
      res.json({
        username: decrypt.username,
        id: decrypt.id,
        admin: decrypt.admin,
      });
  } else {
    res.json('No current user.');
  }
})

// Logs user out on GET
app.get('/logout', (req, res) => {
  res.clearCookie('token', { secure: false, httpOnly: true });
  res.json('Success');
});


app.use('/', indexRouter);

app.listen(process.env.PORT, () => console.log(`Listening on Port ${process.env.PORT}`));