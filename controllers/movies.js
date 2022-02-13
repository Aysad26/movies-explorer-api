const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  idValidationErrorText,
  movieNotFoundErrorText,
  validationErrorText,
  movieIdNotFoundErrorText,
  forbiddenErrorText,
} = require('../constants/constants');

function getMovies(req, res, next) {
  Movie.find({ owner: req.user._id })
    .orFail(new NotFoundError(movieNotFoundErrorText))
    .then((movies) => res.send(movies))
    .catch(next);
}

function createMovie(req, res, next) {
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
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(validationErrorText);
      }
      throw err;
    })
    .catch(next);
}

function deleteMovie(req, res, next) {
  Movie.findById(req.params.movieId).select('+owner')
    .orFail(new NotFoundError(movieIdNotFoundErrorText))
    .then((movie) => {
      if (req.user._id === movie.owner.toString()) {
        movie.remove()
          .then((deletedMovie) => res.send(deletedMovie))
          .catch(next);
      } else {
        throw new ForbiddenError(forbiddenErrorText);
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new ValidationError(idValidationErrorText);
      }
      throw err;
    })
    .catch(next);
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
