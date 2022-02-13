const authentication = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { registrationValidation, loginValidation } = require('../middlewares/validator');

authentication.post('/signin', loginValidation, login);
authentication.post('/signup', registrationValidation, createUser);

module.exports = authentication;
