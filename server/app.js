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

const indexRouter = require('./routes/index');

require('dotenv').config();

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true,
}));
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json(req.cookies);
})

app.use('/', indexRouter);

app.listen(process.env.PORT, () => console.log(`Listening on Port ${process.env.PORT}`));