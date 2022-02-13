require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const router = require('./routes/index');
const centralErrorHandler = require('./middlewares/centralErrorHandler');
const config = require('./config/config');

const app = express();

mongoose.connect(config.MONGO_URL, config.mongooseParams);

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(requestLogger);
app.use(limiter);
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(centralErrorHandler);

app.listen(config.PORT);
