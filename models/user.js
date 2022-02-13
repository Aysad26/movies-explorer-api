const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { AuthError, NotFoundError } = require('../errors/AuthError');
const {
  emailErrorText,
  loginErrorText,
  passwordErrorText,
  userNotFoundErrorText,
} = require('../constants/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: emailErrorText,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator(password) {
        return /^\S+$/.test(password);
      },
      message: passwordErrorText,
    },
  },
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundErrorText);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(loginErrorText);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
