const express = require('express')
const userModel = require('../models/userModel')
const Joi = require('joi')// for data validation
const { createAccount } = require('../validators/userValidator')// to access the content of the createaccount const
const { createToken } = require('../setting/jwt')
const user = require('../models/userModel')
const { options } = require('../router/routes')
const { find } = require('../models/userModel')

// for the signup of user
const userSignup = async (req, res) => {
    try {
        const userForm = await createAccount.validateAsync(req.body)
        console.log(userForm)
        const user = await new userModel(req.body).save()
        const token = await createToken(user) //generate token
        //udate token in db
        const UpdateUser = await userModel.findOneAndUpdate({ _id: user._id }, { token: token }, { new: true })

        res.status(201).send({ data: UpdateUser })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// for the updation of User Profile
const updateProfile = async (req, res) => {
    const updates = Object.keys(req.body)// to convert array to string
    const allowedUpdates = ['address', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: '! NOT Allowed Invalid Update ' })
    }

    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(400).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).json({ message: error.message })
    }
}


/*
// to get the profile of the user
  const Profile = async (req, res) => {
    try {
        const User = await userModel.find({})
        res.send(User)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

*/

// const Profile = async (req, res) => {
//     try {
//         let limit =parseInt(req.query.limit)
//         let skip = parseInt(req.query.skip)
//         const userList = await userModel.find({},null,{limit:limit, skip:skip }).select(['userName','email'])
//      let data = {
//          userData: userList
//      }
//         res.send(userList)
       

//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }

// }




//list of all usrs whose age  is between 18-30

//select name, email, id from users list
//2. search by name and email
//3. total count of users //.countDocuments({})

const Profile = async (req, res) => {
    try {
        const skip  = parseInt(req.query.skip)  || 0
        const limit = parseInt(req.query.limit) || 10
        let search = req.query.search
        // console.log(typeof(skip),limit)
        
        let searchQuery ={};
        if(search){
            searchQuery = {userName: {$regex: search, $options: "i" }}
        } 
        // const userList = await userModel.find(searchQuery,null, {sort: {email: -1}}).skip(skip).limit(limit).select(['userName','email'])
        const userList = await userModel.find(searchQuery).select('-token -password').sort({createdAt: -1}).skip(skip).limit(limit)
        const list = await userModel.countDocuments({})
        
   
        let data = {
            users : list,
            userData: userList
        }
        res.send(data)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

//authenticate,
// const Profile =  async (req,res) => {
//     //const _ispublished = req.query.published;
//     const match = {}

//     if(req.query.published){
//         match.published = req.query.published === 'true'
//     }
//     try {
//         await req.user.populate({
//             path:'get_profile',
//             match,
//             options:{
//                 limit: parseInt(req.query.limit),
//                 skip: parseInt(req.query.skip)
//             }
//         }).execPopulate()
//         res.send(req.user.posts)
//     } catch (error) {
//         res.status(500).send()
//     }
// }

// to get the user by it's ID
const ProfileId = async (req, res) => {
    try {
        console.log('user---', req.user)
        const userId = req.query.userId || req.user._id
        const user = await userModel.findById(userId).select('-token -password')
        if (!user) {
            throw Error('User not found');
        }
        res.send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }

}

// user login profile
const Login = async (req, res) => {

    try {
        const userData = await userModel.findByCredentials(req.body.email, req.body.password)
        const token = await createToken(user) //generate new token
        const UpdateUser = await userModel.findOneAndUpdate({ _id: userData._id }, 
            { token: token }, { new: true }) //update new token in db
        res.status(200).send(UpdateUser)
    } catch (error) {
        res.status(400).json({ message: error.message })

    }
}

module.exports = {
    userSignup,
    Profile,
    ProfileId,
    updateProfile,
    Login
}

