const notFoundErrorText = 'Запрашиваемый ресурс не найден';
const userNotFoundErrorText = 'Пользователь с таким id не найден!';
const movieNotFoundErrorText = 'Фильмы не найдены!';
const tokenNotFoundErrorText = 'Токен не найден!';
const movieIdNotFoundErrorText = 'Фильма с таким id не существует!';

const unauthorizedErrorText = 'Необходима авторизация';
const forbiddenErrorText = 'Нет доступа';
const limiterErrorText = 'Слишком много запросов. Попробуйте позже';
const serverErrorText = 'На сервере произошла ошибка';

const linkErrorText = 'Ссылка не корректна. Попробуйте еще раз';
const emailErrorText = 'Email не корректен. Попробуйте еще раз';
const loginErrorText = 'Неправильные почта или пароль!';
const passwordErrorText = 'Пароль не должен содержать пробелы. Попробуйте еще раз';
const conflictErrorText = 'Такой пользователь уже зарегистрирован!';
const validationErrorText = 'Вы ввели некорректные данные. Попробуйте еще раз';
const idValidationErrorText = 'Передан некорректный id';

const requiredErrorText = 'Необходимо заполнить поле {#label}';
const minLengthErrorText = 'Это поле должно содержать не менее {#limit} символов';
const maxLengthErrorText = 'Это поле должно содержать не более {#limit} символов';
const emptyInputErrorText = 'Это поле не может быть пустым';
const idErrorText = 'Некорректный id';

const passRegEx = /^\S+$/;

module.exports = {
  notFoundErrorText,
  userNotFoundErrorText,
  movieNotFoundErrorText,
  tokenNotFoundErrorText,
  movieIdNotFoundErrorText,
  unauthorizedErrorText,
  forbiddenErrorText,
  limiterErrorText,
  serverErrorText,
  linkErrorText,
  emailErrorText,
  loginErrorText,
  passwordErrorText,
  conflictErrorText,
  validationErrorText,
  idValidationErrorText,
  requiredErrorText,
  minLengthErrorText,
  maxLengthErrorText,
  emptyInputErrorText,
  idErrorText,
  passRegEx,
};
