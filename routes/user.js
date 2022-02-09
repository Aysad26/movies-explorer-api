const router = require('express')
  .Router();
const { validateUserInfo } = require('../middlewares/validation');
const {
  updateUser,
  getUser,
} = require('../controllers/user');

router.get('/me', getUser); // возвращает информацию о пользователе (email и имя)
router.patch('/me', validateUserInfo, updateUser); // обновляет информацию о пользователе (email и имя)

module.exports = router;
