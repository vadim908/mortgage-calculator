const router = require('express').Router(); // создали роутер

const {
    addData,
  } = require('../controllers/data');

  router.post('/', addData);

  module.exports = router;