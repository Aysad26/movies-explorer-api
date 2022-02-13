const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const AuthError = require('../errors/AuthError');
const ConflictError = require('../errors/ConflictError');
const { JWT_SECRET } = require('../config/config');
const {
  validationErrorText,
  userNotFoundErrorText,
  conflictErrorText,
  loginErrorText,
} = require('../constants/constants');

function getUser(req, res, next) {
  User.findById(req.user._id)
    .orFail(new NotFoundError(userNotFoundErrorText))
    .then((user) => res.send(user))
    .catch(next);
}

function createUser(req, res, next) {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(validationErrorText);
      } else if (err.code === 11000 && err.name === 'MongoError') {
        throw new ConflictError(conflictErrorText);
      }
      throw err;
    })
    .catch(next);
}

function updateUser(req, res, next) {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .orFail(new NotFoundError(userNotFoundErrorText))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(validationErrorText);
      } else if (err.code === 11000 && err.name === 'MongoError') {
        throw new ConflictError(conflictErrorText);
      }
      throw err;
    })
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new AuthError(loginErrorText);
      }
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'AuthError' || 'NotFoundError') {
        throw new AuthError(loginErrorText);
      }
    })
    .catch(next);
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  login,
};
