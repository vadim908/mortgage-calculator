const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const cors = require('cors');
const { newUser, login } = require('./controllers/users');
const { PORT = 3005, BASE_PATH } = process.env;

const app = express(); 

mongoose.connect('mongodb://localhost:27017/myCalcIps', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.post('/signup', newUser);
  
app.post('/signin', login);

app.use(auth);

app.use('/data', require('./routes/data'));
app.use('/users', require('./routes/users'));

app.use('*', require('./routes/notFound'));

app.use((err, req, res, next) => {
    if (err.statusCode) {
      res.status(err.statusCode).send({ message: err.message });
    } else {
      res.status(500).send({ message: err.message });
    }
    if (next) next();
  });

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Ссылка на сервер');
    // eslint-disable-next-line no-console
    console.log(BASE_PATH);
  });
