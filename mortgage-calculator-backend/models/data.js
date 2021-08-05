const mongoose = require('mongoose');


const dataSchema = new mongoose.Schema({
  purpose: {
      type: String,
      required: true,
    },
  region: {
    type: String,
    required: true,
    },
  price: {
    type: Number,
    required: true,
    min: 300000,
    max: 99000000,
    },
  contribution: {
    type: Number,
    required: true,
    min: 10,
    max: 90,
    },
  period: {
    type: Number,
    required: true,
    min: 1,
    max: 30,
    },
  result: {
    type: Number,
    required: true,
    },
  });

  module.exports = mongoose.model('data', dataSchema);