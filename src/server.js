
require('dotenv').config();
const express = require('express');
const morgon = require('morgan');
const router = require('./auth/router.js');
const app = express();
const notFoundHandler = require('../src/middlewars/404.js');
const errorHandler = require('../src/middlewars/500.js');

app.use(express.json());
app.use(morgon('dev'));
app.use('/',router);

app.use('*',notFoundHandler);
app.use(errorHandler);
module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};