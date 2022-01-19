const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const user = require('../controllers/user');

router.get('/users/me', user.getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email(),
  }),
}), user.updateUser);

module.exports = router;
