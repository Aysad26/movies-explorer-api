const router = require('express').Router();
const user = require('../controllers/user');
const { patchUserValidate } = require('../middlewares/validate');

router.get('/users/me', user.getUser);

router.patch('/users/me', patchUserValidate, user.updateUser);

module.exports = router;
