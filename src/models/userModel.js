const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')// for the pasword encryption and hashing

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
    token: {
        type: String
    },
    address: {
        type: Object,
        required: false
    }
},
    {
        timestamps: true
    })


//function for the login API
userSchema.statics.findByCredentials = async (email, password) => {
    const user1 = await user.findOne({ email }) // apply the find query to the user via email
    if (!user1) { // if not found email assigned to user1
        throw new Error('Unable to Login !')
    }
    const isMatch = await bcrypt.compare(password, user1.password)//compare the pswd given via user and hash paswd on DB
    if (!isMatch) { // if pswd not match 
        throw new Error('Unable to login !')
    }
    return user1 // if above is cond is sucesful then login
}


userSchema.pre('save', async function (next) { // create the middleware(pre, next)
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})



const user = mongoose.model('user', userSchema)

module.exports = user
