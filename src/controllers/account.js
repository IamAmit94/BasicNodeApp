const express = require('express')
const userModel = require('../models/userModel')
const Joi = require('joi')// for data validation
const { createAccount } = require('../validators/userValidator')// to access the content of the createaccount const
const { createToken, decodeToken } = require('../setting/jwt')
const bcrypt = require('bcryptjs')

// for the signup of user
const userSignup = async (req, res) => {
    try {
        const userForm = await createAccount.validateAsync(req.body)
        console.log(userForm)
        const user = await new userModel(req.body).save()
        //generate token
        const token = await createToken(user) 
        //udate token in db
        const UpdateUser = await userModel.findOneAndUpdate({ _id: user._id }, { token: token }, { new: true })

        res.status(201).send({ data: UpdateUser })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// user login profile
const Login = async (req, res) => {
    try {
        const userData = await userModel.findByCredentials(req.body.email, req.body.password)
        console.log("userdata", userData)
        const token = await createToken(userData) //generate new token
        const UpdateUser = await userModel.findOneAndUpdate({ _id: userData._id }, { token: token }, { new: true }) //update new token in db
        res.status(200).send(UpdateUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//logout API for user
const Logout = async (req, res) =>{
    try {
        const id = req.user._id
        const token = await userModel.findById(id)
    
    const logout =   await userModel.findByIdAndUpdate(id, { token :" " })
        res.status(200).json({message : 'Logout Successfully !'})
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

// controller for changing password
const changePassword = async (req, res) => {
    try {
        // console.log(req.user)
        const id = req.user._id // fetch id from token via middleware

        const oldPassword = req.body.Oldpassword
        const newPassword = req.body.NewPassword

        const user = await userModel.findById(id)
        const isMatch = await bcrypt.compare(oldPassword, user.password)// compare the password

        if (!isMatch) {
            throw Error('Old password is wrong !')
        } else {
            let bycryptPassword = await bcrypt.hash(newPassword, 8) //encrypt the new password
            const updatePassword = await userModel.findByIdAndUpdate(id, { password: bycryptPassword })
            res.send({ message: ' Password updated ' })
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

// to update the age and address of the user
const updateProfile = async (req, res) => {
    try {
        const id = req.user._id
        const user = await userModel.findById(id)
        
        if(user){
            const updateProfile = await userModel.findByIdAndUpdate(user, req.body, { new: true, runValidators: true }).select('-token -password')
            return res.status(200).send(updateProfile)
    }
    } catch (e) {
        res.status(400).json({ message: error.message })
    }
}

//To fetch the data of the user with the help of userName and display the data along with the number of user
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

module.exports = {
    userSignup,
    Login,
    Logout,
    changePassword,
    updateProfile,
    Profile
}





























// to get the user by it's ID ProfileId,
/*
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

}*/


