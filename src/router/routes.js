const express = require('express')
const Router = express.Router()
const authorized = require('../helpers/middleware')

//import the controllers
const accountController = require('../controllers/account');
const accountController1 = require('../controllers/post')

// //routes for the user
Router.post('/signup', accountController.userSignup);

Router.post('/login', accountController.Login);

Router.post('/logout',authorized.verifyToken, accountController.Logout); 

Router.post('/changePassword', authorized.verifyToken, accountController.changePassword);

Router.put('/update_profile', authorized.verifyToken ,accountController.updateProfile);

Router.get('/get_profile', authorized.verifyToken, accountController.Profile);

// routes for the post

Router.post('/createPost', authorized.verifyToken, accountController1.createPosts)

Router.put('/update_Post/:postId',authorized.verifyToken,accountController1.updatePosts)

Router.get('/allPosts', authorized.verifyToken,accountController1.allPosts) //

Router.get('/Posts/userID',authorized.verifyToken ,accountController1.getPostByUserId)// getPostByUserId


module.exports = Router