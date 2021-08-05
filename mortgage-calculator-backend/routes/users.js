const router = require('express').Router(); // создали роутер

const {
    infoUser,
  } = require('../controllers/users');

  router.get('/me', infoUser);

  module.exports = router;