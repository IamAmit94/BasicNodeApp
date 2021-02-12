const express = require('express')
const Router = express.Router()
const authorized = require('../helpers/middleware')

//import the controllers
const accountController = require('../controllers/account');

// //routes
Router.post('/signup', accountController.userSignup);

Router.post('/login', accountController.Login);

Router.put('/update_profile/:id', accountController.updateProfile);

Router.get('/get_profile', accountController.Profile);

Router.get('/getProfile', authorized.verifyToken, accountController.ProfileId);


module.exports = Router