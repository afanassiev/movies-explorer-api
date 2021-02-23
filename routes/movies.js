const moviesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { moviesList, createMovie, removeMovie } = require('../controllers/movies');

moviesRouter.get('/movies', moviesList);

moviesRouter.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().integer().required(),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/^(https?:\/\/)(www\.)?([\w\W\d]+)(\.)([a-z]{1,10})([\w\W\d]+)?$/),
    trailer: Joi.string().required().pattern(/^(https?:\/\/)(www\.)?([\w\W\d]+)(\.)([a-z]{1,10})([\w\W\d]+)?$/),
    thumbnail: Joi.string().required().pattern(/^(https?:\/\/)(www\.)?([\w\W\d]+)(\.)([a-z]{1,10})([\w\W\d]+)?$/),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required()
  }),
}), createMovie);

moviesRouter.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
}), removeMovie);

module.exports = moviesRouter;
