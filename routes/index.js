const router = require('express').Router();
const movies = require('./movies');
const users = require('./users');
const authentication = require('./authentication');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');

router.use('/', authentication);
router.use(auth);
router.use('/movies', movies);
router.use('/users', users);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
