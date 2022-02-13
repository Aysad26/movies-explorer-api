const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const ValidationError = require('../errors/validation-error');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ movies }))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    owner,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => res.send({ body: movie }))
    .catch((err) => next(err));
};


    module.exports.deleteMovie = (req, res, next) => {
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
