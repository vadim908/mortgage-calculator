const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const UniSender = require('unisender');
const { NODE_ENV, JWT_SECRET } = process.env;
const IncorrectDataError = require('../errors/IncorrectDataError');
const NotFoundError = require('../errors/not-found-err');
const IncorrentTokenError = require('../errors/incorrentTokenError');
const ConflictError = require('../errors/ConflictError');

module.exports.newUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then((hash) => User.create({
        email: req.body.email,
        name: req.body.name,
        password: hash,
      }))
      .then((user) =>{
        const uniSender = new UniSender({
          api_key: '6yr1m4jwzwy3n3b8oip95h9pmgkgcxp9tw5iu3ry',
          lang: 'ru'                // optional, 'en' by default
        });
        
          uniSender.importContacts({
            field_names: ['email', 'email_list_ids'],
            data: [
              { email: user.email, email_list_ids: '2' },
            ]
        })
          res.status(201).send({
            email: user.email,
            name: user.name,
          })

        })
      .catch((err) => {
        if (err.name === 'MongoError' && err.code === 11000) {
          throw new ConflictError('Данный пользователь уже зарегистрирован');
        } else if ((err.name === 'CastError') || (err.name === 'ValidationError')) {
          throw new IncorrectDataError('Переданы некорректные данные');
        } else if (err.message === 'NotFound') {
          throw new NotFoundError('Ресурс не найден');
        }
        next(err);
      })
      .catch(next);
  };

  module.exports.login = (req, res, next) => {
    const { email, password } = req.body;
  
    return User.findUserByCredentials(email, password)
      .then((user) => {
        // создадим токен
        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });

        // вернём токен
        res.send({ token });
      })
      .catch(() => {
        throw new IncorrentTokenError('Неправильная почта или пароль');
      })
      .catch(next);
  };

  module.exports.infoUser = (req, res, next) => {
    User.findById({ _id: req.user._id })
        .orFail(() => new Error('NotFound'))
        .then((user) => {
          if (!user) {
            throw new IncorrectDataError('Переданы некорректные данные');
          }
          res
            .status(200)
            .send(user);
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            throw new IncorrectDataError('Переданы некорректные данные');
          } else if (err.message === 'NotFound') {
            throw new NotFoundError('Пользователь не найден');
          }
          next(err);
        })
        .catch(next);
  };