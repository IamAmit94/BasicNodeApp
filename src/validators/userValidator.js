const joi = require('joi')

const createAccount = joi.object().keys({

    userName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(7).required()

})

module.exports = {createAccount}