const userModel = require('../models/userModel')
const Joi = require('joi')
const {createAccount} = require('../validators/userValidator')
const {createToken} = require('../setting/jwt')


const userSignup = async (req, res) => {
    try {
        const userForm = await createAccount.validateAsync(req.body)
        console.log(userForm)
        const user = await new userModel(req.body).save()
        const token = await createToken(user)
        const UpdateUser = await userModel.findOneAndUpdate( { _id : user._id }, {token: token }, { new:true })
        
        res.status(201).send({ data: UpdateUser })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports={
    userSignup
}

