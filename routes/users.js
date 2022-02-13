const users = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { userValidation } = require('../middlewares/validator');

users.get('/me', getUser);
users.patch('/me', userValidation, updateUser);

module.exports = users;
