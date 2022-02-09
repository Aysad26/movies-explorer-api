const router = require('express').Router();
const usersRouter = require('./user');
const moviesRouter = require('./movie');
const NotFoundError = require('../errors/not-found-error');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/user');
const { validateSignUp, validateSignIn } = require('../middlewares/validation');

router.post('/signin', validateSignIn, login);
router.post('/signup', validateSignUp, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.all('*', () => {
  throw new NotFoundError('Такой страницы не существует');
});

module.exports = router;
