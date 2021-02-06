const mongoose =  require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    age: {
        type: Number,
        required: false
    },
    token:{
        type: String
    },
    address: {

        type: Object,
        required: false
    }

})

userSchema.statics.findByCredentials = async (email, password) => {

    const user1 = await user.findOne({email})

if(!user1) {
throw new Error('Unable to Login !')

}
const isMatch = await bcrypt.compare(password, user1.password)

if(!isMatch){
    throw new Error('Unable to login !')
}
return user1
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})
const user = mongoose.model('user', userSchema)

module.exports = user
