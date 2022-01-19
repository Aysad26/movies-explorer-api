const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const { requestLogger, errorLogger } = require('./middlewares/logger');
const myErrors = require('./middlewares/errors');

const { PORT = 3000 } = process.env;

mongoose.connect(`mongodb://localhost:27017/bitfilmsdb`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(requestLogger);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
});

app.use(limiter);

app.use(helmet());

app.use('/', require('./routes'));

app.use(errorLogger);

app.use(errors());

app.use(myErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
