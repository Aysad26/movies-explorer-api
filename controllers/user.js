const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const DuplicateError = require('../errors/duplicate-error');

const { JWT_SECRET = 'some-secret-key' } = process.env;

// Создание пользователя
module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.send({
      _id: user._id,
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        throw new DuplicateError('Такой пользователь уже существует');
      } else {
        next(err);
      }
    })
    .catch(next);
};

// Авторизация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

// Обновление
module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  const objForUpdate = {};
  if (name) objForUpdate.name = name;
  if (email) objForUpdate.email = email;

  User.findByIdAndUpdate(req.user._id, objForUpdate, { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }

      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'MongoError' && err.codeName === 'DuplicateKey') {
        throw new DuplicateError('Такой пользователь уже существует');
      } else {
        next(err);
      }
    })
    .catch(next);
};

// Получение информации
module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }

      res.status(200).send(user);
    })
    .catch(next);
};
