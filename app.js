const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./utils/rateLimiter');

require('dotenv').config();

const { requestLogger, errorLogger } = require('./middlewares/logger');
const myErrors = require('./middlewares/errors');

const { PORT = 3001, DB_LOCAL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;


const app = express();

app.use(helmet());
app.use(cors());

mongoose.connect(DB_LOCAL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);

app.use('/', require('./routes'));

app.use(errorLogger);

app.use(errors());

app.use(myErrors);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
