const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

router.use('/', require('./auth'));

router.use(auth);

router.use('/', require('./user'));
router.use('/', require('./movie'));

router.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
