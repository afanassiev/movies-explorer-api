const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const movies = require('./routes/movies');
const users = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundErr = require('./errors/not-found-err');

const {
  PORT = 3000,
  MONGO = 'mongodb://localhost:27017/bitfilmsdb'
} = process.env;
const app = express();

mongoose.connect(MONGO, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30),
    name: Joi.string().min(2).max(30),
    password: Joi.string().required().min(8)
  }).unknown(true),
}), createUser);

app.use('/', auth, movies);
app.use('/', auth, users);

app.all('*', (req, res, next) => {
  next(new NotFoundErr('Запрашиваемый ресурс не найден'));
});
app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? 'Ошибка на стороне сервера' : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
