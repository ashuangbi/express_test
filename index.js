import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from 'config';

import routes from './src/routes/index.route';

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// mount all routes on /api path
app.use('/api', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('API NOT FOUND');
  return next(err);
});

// connect to mongo db
const mongoUri = config.Mongo.host;
mongoose.connect(mongoUri, { useNewUrlParser: true }).then(() => {
  console.log('successfully connect to database');
});
mongoose.connection.on('error', () => {
  const msg = `unable to connect to database uri: ${config.Mongo.host}`;
  throw new Error(msg);
});

// launch server
app.listen(config.App.port, () => {
  console.log(`server started on port ${config.App.port} (${process.env.NODE_ENV})`);
});

module.exports = app;
