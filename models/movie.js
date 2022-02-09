const mongoose = require('mongoose');

const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]+\.[a-zA-Z0-9()]+([-a-zA-Z0-9()@:%_\\+.~#?&/=#]*)/;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator(link) {
        return linkRegex.test(link);
      },
      message: 'Введите корректный URL изображения',
    },
  },
  trailer: {
    required: true,
    type: String,
    validate: {
      validator(link) {
        return linkRegex.test(link);
      },
      message: 'Введите корректный URL трейлера',
    },
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator(link) {
        return linkRegex.test(link);
      },
      message: 'Введите корректный URL изображения',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
