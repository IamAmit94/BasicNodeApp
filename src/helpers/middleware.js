const userModel = require('../models/userModel')
const jwtToken = require('../setting/jwt')
const postModels = require('../models/postModels')

let verifyToken = async (req, res, next) => {
    try {
        // console.log("req", req)
        // token provided to the header via authorization
        const token = req.headers['authorization'] 

        // const token = req.header
        if (!token) { //if token is not available in request
            throw Error('Token not found');
        }

        //if token exist in db
        let userData = await userModel.findOne({ token: token })
        if (!userData) {
            throw Error('UnAuthorized')
        }
        
        //decode the jwt token
        let userToken = await jwtToken.decodeToken(token)
        console.log("userToken", userToken)

        if (userToken == "TokenExpiredError: jwt expired") {
            throw Error('Jwt token expired')
        }
        //if validation passes then pass the data to next() middleware
        //we added user property in request object and assign userdata value to it
        req.user = userData; // userData where the token stored
        next()
    } catch (err) {
        res.status(401)
        res.send({
            error: err.message
        })
    }

}

module.exports = {verifyToken }
