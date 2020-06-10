'use strict';

const mongoose = require('mongoose');

const basicAuth = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
module.exports = mongoose.model('basicAuth',basicAuth);