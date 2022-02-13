const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const AuthError = require('../errors/AuthError');
const { unauthorizedErrorText } = require('../constants/constants');

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError(unauthorizedErrorText));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthError(unauthorizedErrorText));
  }
  req.user = payload;
  next();
}

module.exports = auth;
