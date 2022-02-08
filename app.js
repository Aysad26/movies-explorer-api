const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./utils/rateLimiter');
const corsOption = require('./middlewares/cors');

require('dotenv').config();

const { requestLogger, errorLogger } = require('./middlewares/logger');
const myErrors = require('./middlewares/errors');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(helmet());
app.use(cors(corsOption));

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  autoIndex: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);

app.use('/', require('./routes'));

app.use(errorLogger);

app.use(errors());

app.use(myErrors);

app.listen(PORT, () => PORT);
