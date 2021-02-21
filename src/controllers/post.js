const joi = require('joi')
const postModels = require('../models/postModels')
const user = require('../models/userModel')
const { createPost } = require('../validators/postValidator')

// Creating the post

const createPosts = async (req, res) => {
    try {
        //validations
        let postForm = await createPost.validateAsync(req.body)
        // console.log("validate data***", postForm)
        postForm.userId = req.user._id
        // saving user(middleware) _id(user id from user collection) which we are getting from the middleware|| userId is ref provided in the post module to fetch the data
        // console.log("validate 2***", postForm)

        const post = await new postModels(postForm).save()
        //.populate('userId',{email:1, userName:1})
        res.status(200).json({ data: post })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

// UpdatePost
const updatePosts = async (req, res) => {
    try {
        const postId = req.params.postId
        // console.log(postId,'****posts')
        const post = await postModels.findOne({ _id: postId, userId: req.user._id }) // post  created via user userId from postModels refrence
        if (post) {
            const updatePosts = await postModels.findByIdAndUpdate(postId, req.body, { new: true })
            // we provide the value in findById and parameters in the findOne()
            return res.status(200).send(updatePosts)
        }
        else {
            throw Error('Post Not found ')
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
        console.log(error)
    }

}
// Getting the data from  post 
const allPosts = async (req, res) => {
    try {
        let search = req.query.search
        let searchQuery = {}

        if (search) {
            searchQuery = { title: { $regex: search, $options: "i" } }
        }
        const postList = await postModels.find(searchQuery).select(['title', 'description']).sort({ title: -1 })

        const postList1 = await postModels.countDocuments({})

        let data1 = {
            post : postList1,
            postData: postList
        }

        res.send(data1).json({ data: data })
    } catch (error) {
        res.status(400).json({ message: error.message })

    }
}

// TO VIEW THE POST CREATED VIA AUTH USER
const getPostByUserId = async (req, res) => {
    try {
        const ID = req.params.userid
        // console.log('The ID is ', ID)
        const posts = await postModels.find({ ususerID: ID })
        res.status(200).send(posts)

        // res.send(postList).json({ data: data })
    } catch (error) {
        res.status(400).json({ message: error.message })

    }
}

module.exports = {
    createPosts, 
    updatePosts,
    allPosts,
    getPostByUserId
}