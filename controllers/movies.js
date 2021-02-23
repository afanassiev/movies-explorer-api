const Movie = require('../models/movie');
const AuthorizationErr = require('../errors/authorization-err');
const ForbiddenErr = require('../errors/forbidden-err');
const NotFoundErr = require('../errors/not-found-err');

module.exports.moviesList = (req, res, next) => {
  Movie.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch(() => next(new AuthorizationErr()));
};

module.exports.removeMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(new NotFoundErr('Фильм не найден'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenErr('Ошибка доступа');
      }
      movie.remove()
        .then((deletedMovie) => res.send({ data: deletedMovie }));
    })
    .catch(next);
};
