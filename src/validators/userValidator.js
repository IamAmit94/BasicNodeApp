const joi = require('joi')

const createAccount = joi.object().keys({

    userName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(7).required()

})

// const Login = joi.object().keys({

//     email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
//     password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))

// })

// const updateProfile = joi.object().keys({

//     address: joi.string().alphanum(),
//     age: joi.number().positive().max(100)
// })


module.exports = {
    createAccount,
    // Login,
    // updateProfile

}