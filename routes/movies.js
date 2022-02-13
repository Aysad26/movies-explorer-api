const movies = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { moviesAddValidation, moviesDeleteValidation } = require('../middlewares/validator');

movies.get('/', getMovies);
movies.post('/', moviesAddValidation, createMovie);
movies.delete('/:movieId', moviesDeleteValidation, deleteMovie);

module.exports = movies;
