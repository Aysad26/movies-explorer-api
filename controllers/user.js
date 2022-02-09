const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-error');
const DuplicateError = require('../errors/conflict-error');
const ValidationError = require('../errors/validation-error');

dotenv.config();

const {
  NODE_ENV,
  JWT_SECRET,
} = process.env;

// Создание пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  if (!email || !name || !password) {
    throw new ValidationError('Почта или пароль неверные');
  }
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        name,
        password: hash,
      })
        .then((user) => {
          const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`, { expiresIn: '7d' });
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
          });
        })
        .catch((err) => {
          if (err.name === 'MongoError' && err.code === 11000) {
            throw new DuplicateError('Пользователь с таким email уже существует');
          } else if (err.name === 'ValidationError' || err.name === 'CastError') {
            throw new ValidationError('Пароль или почта некорректны');
          } else {
            next(err);
          }
        })
        .catch(next);
    });
};

// Авторизация
module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`, { expiresIn: '7d' });
      res.status(200)
        .send({
          _id: user._id,
          name: user.name,
          email: user.email,
          token,
        });
    })
    .catch((err) => next(err));
};

// Обновление
module.exports.updateUser = (req, res, next) => {
  const {
    name,
    email,
  } = req.body;
  if (!name || !email) {
    throw new ValidationError('Введенные данные некорректны');
  }
  User.findByIdAndUpdate(req.user._id, {
    name,
    email,
  }, {
    new: true,
    runValidators: true,
  })
    .orFail(new NotFoundError('Пользователь с таким id не найден!'))
    .then((data) => res.status(200)
      .send(data))
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        throw new DuplicateError('Пользователь с таким email уже существует');
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new ValidationError('Введенные данные некорректны');
      } else {
        next(err);
      }
    })
    .catch(next);
};

// Получение информации
module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь с таким id не найден!'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Id неверный');
      } else {
        next(err);
      }
    })
    .catch(next);
};
