const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true, 
        trim: true,
    }, 
    image:{
        type: String,
    }, 
    description:{
        type: String, 
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId, ref:'user',
        required: true
    },
},
{
    timestamps : true
})
const posts = mongoose.model('posts', userSchema)

module.exports = posts