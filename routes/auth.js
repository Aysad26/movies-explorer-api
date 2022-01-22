const router = require('express').Router();
const { createUser, login } = require('../controllers/user');
const { signupValidate, signinValidate } = require('../middlewares/validate');

router.post('/signin', signinValidate, login);
router.post('/signup', signupValidate, createUser);

module.exports = router;
