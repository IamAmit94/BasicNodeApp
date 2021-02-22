const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId, ref:'user', // ref name is model name
        required: true
    },
},
{
    timestamps : true
})
const posts = mongoose.model('posts', postSchema)// model name and structure

module.exports = posts