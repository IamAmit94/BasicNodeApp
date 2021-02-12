const userModel = require('../models/userModel')
const jwtToken = require('../setting/jwt')


let verifyToken = async (req, res, next) => {
    try {
        // console.log("req", req)
        const token = req.headers['authorization']

        // const token = req.header
        if (!token) { //if token is not available in request
            throw Error('Token not found');
        }
        //if token exist in db
        let userData = await userModel.findOne({ token: token })
        if (userData) {
            //decode the jwt token
            let userToken = await jwtToken.decodeToken(token)
            console.log("userToken", userToken)
            if (userToken == "TokenExpiredError: jwt expired") {
                throw Error('Jwt token expired')
            }
            //if validation passes the pass the data to next function
            req.user = userData;
            next()
        } else {
            throw Error('UnAuthorized')
        }
    } catch (err) {
        res.status(401)
        res.send({
            error: err.message
        })
    }

}

module.exports = {verifyToken}