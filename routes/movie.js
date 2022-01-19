const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const movie = require('../controllers/movie');

router.get('/movies', movie.getMovies);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required(),
    trailer: Joi.string().uri().required(),
    thumbnail: Joi.string().uri().required(),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), movie.createMovie);

router.delete('/movies/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }).unknown(true),
}), movie.deleteMovie);

module.exports = router;
