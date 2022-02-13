const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  requiredErrorText,
  emailErrorText,
  passwordErrorText,
  linkErrorText,
  minLengthErrorText,
  maxLengthErrorText,
  emptyInputErrorText,
  idErrorText,
  passRegEx,
} = require('../constants/constants');

const moviesAddValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': requiredErrorText,
        'string.empty': emptyInputErrorText,
      }),
    director: Joi.string().required()
      .messages({
        'any.required': requiredErrorText,
        'string.empty': emptyInputErrorText,
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': requiredErrorText,
        'number.empty': emptyInputErrorText,
      }),
    year: Joi.string().required()
      .messages({
        'any.required': requiredErrorText,
        'string.empty': emptyInputErrorText,
      }),
    description: Joi.string().required()
      .messages({
        'any.required': requiredErrorText,
        'string.empty': emptyInputErrorText,
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(linkErrorText);
    })
      .messages({
        'any.required': requiredErrorText,
        'string.empty': emptyInputErrorText,
      }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(linkErrorText);
    })
      .messages({
        'any.required': requiredErrorText,
        'string.empty': emptyInputErrorText,
      }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(linkErrorText);
    })
      .messages({
        'any.required': requiredErrorText,
        'string.empty': emptyInputErrorText,
      }),
    movieId: Joi.number().required()
      .messages({
        'any.required': requiredErrorText,
        'number.empty': emptyInputErrorText,
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': requiredErrorText,
        'string.empty': emptyInputErrorText,
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': requiredErrorText,
        'string.empty': emptyInputErrorText,
      }),
  }),
});

const moviesDeleteValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24)
      .messages({
        'string.length': idErrorText,
      }),
  }),
});

const registrationValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': requiredErrorText,
        'string.empty': emptyInputErrorText,
        'string.min': minLengthErrorText,
        'string.max': maxLengthErrorText,
      }),
    email: Joi.string().required().email()
      .messages({
        'any.required': requiredErrorText,
        'string.empty': emptyInputErrorText,
        'string.email': emailErrorText,
      }),
    password: Joi.string().min(5).required().pattern(passRegEx)
      .messages({
        'any.required': requiredErrorText,
        'string.empty': emptyInputErrorText,
        'string.min': minLengthErrorText,
        'string.pattern': passwordErrorText,
      }),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'any.required': requiredErrorText,
        'string.empty': emptyInputErrorText,
        'string.email': emailErrorText,
      }),
    password: Joi.string().min(5).required().pattern(passRegEx)
      .messages({
        'any.required': requiredErrorText,
        'string.empty': emptyInputErrorText,
        'string.min': minLengthErrorText,
        'string.pattern': passwordErrorText,
      }),
  }),
});

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': requiredErrorText,
        'string.empty': emptyInputErrorText,
        'string.min': minLengthErrorText,
        'string.max': maxLengthErrorText,
      }),
    email: Joi.string().required().email()
      .messages({
        'any.required': requiredErrorText,
        'string.empty': emptyInputErrorText,
        'string.email': emailErrorText,
      }),
  }),
});

module.exports = {
  moviesAddValidation,
  moviesDeleteValidation,
  registrationValidation,
  loginValidation,
  userValidation,
};
