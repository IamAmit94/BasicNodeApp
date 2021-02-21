// for the user
const jwt = require('jsonwebtoken')
const { JWT_SECRET, JWT_EXP } = process.env

const createToken = async (data) => {
    try {
        let payload={
            _id: data.id,
            email: data.email,
            userName: data.userName
        }
const token = await jwt.sign({ data: payload},JWT_SECRET,{ expiresIn: JWT_EXP });
        return token; 
        
    } catch (error) {
        return error
    }
}

//decode JWt
 const decodeToken = async (token) => {
    try {
        var decoded = jwt.verify(token, JWT_SECRET)
        // console.log("decoded--", decoded)
        return decoded;
      } catch(err) {
          console.log("errr---", err)
        return err
      }
 }
module.exports = {
    createToken,
    decodeToken
}
