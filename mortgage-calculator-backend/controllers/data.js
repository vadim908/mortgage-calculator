const Data = require('../models/data');
const User = require('../models/users');
const UniSender = require('unisender');
const IncorrectDataError = require('../errors/IncorrectDataError');
const uniSender = new UniSender({
    api_key: '6yr1m4jwzwy3n3b8oip95h9pmgkgcxp9tw5iu3ry',
    lang: 'ru'                // optional, 'en' by default
});


module.exports.addData = (req, res, next) => {
    const userId = { _id: req.user._id };

    const {
      purpose,
      region,
      price,
      contribution,
      period,
      result,
    } = req.body;
    Data.create(
      {
        purpose,
        region,
        price,
        contribution,
        period,
        result,
        owner: userId,
      },
    )
      .then((data) =>{

        
        User.findById(req.user._id)
        .then((res)=> {
            uniSender.createEmailMessage({
            sender_name: "Ипотечный калькулятор",
            sender_email: "ya.vadim908@yandex.ru",
            subject: 'Ваши ипотечные данные',
            body: `<p>Цель кредита: ${data.purpose}</p>
                    <p>Регион: ${data.region}</p>
                    <p>Стоимость недвижимости: ${data.price}</p>
                    <p>Первоначальный взнос:  ${data.contribution}</p>
                    <p>Срок кредита: ${data.period}</p>
                    <p>Сумма кредита: ${data.result}</p>`,
            list_id: 2
        }).then(function (response) {
            uniSender.createCampaign({
            message_id: response.result.message_id,
            })
            .then((res)=> console.log(res))
            console.log('Message id: ' + response.result.message_id);
        }).catch(function (response) {
            console.log('Error:' + response.error);
        });
        })
        
       
        res.send(data)
      } )
      .catch((err) => {
        if (err.name === 'CastError') {
          throw new IncorrectDataError('Переданы некорректные данные');
        } else if (err.name === 'ValidationError') {
          throw new IncorrectDataError(err.message);
        }
        next(err);
      })
      .catch(next);
  };

