const express = require('express')
const Router = express.Router()

//import the controllers
const accountController = require('../controllers/account');

//routes
Router.post('/signup', accountController.userSignup);

module.exports = Router