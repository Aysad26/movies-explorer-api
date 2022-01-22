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
  const owner = req.user._id;
  Movie
    .findById({ _id: req.params.movieId }).select('+owner')
    .orFail(() => new NotFoundError('Нет такой карточки'))
    .then((movie) => {
      if (!movie.owner.equals(owner)) {
        next(new ForbiddenError('Нет прав на удаление карточки'));
      } else {
        Movie.deleteOne(movie)
          .then(() => res.send({ message: 'Карточка удалена' }));
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new ValidationError('Невалидный id фильма'));
      } else {
        next(err);
      }
    });
};
