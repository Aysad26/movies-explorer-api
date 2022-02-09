const router = require('express').Router();
const movie = require('../controllers/movie');
const { moviesValidate, movieIdValidate } = require('../middlewares/validate');

router.get('/movies', movie.getMovies);

router.post('/movies', moviesValidate, movie.createMovie);

router.delete('/movies/:movieId', movieIdValidate, movie.deleteMovie);

module.exports = router;
