const jwt = require('jsonwebtoken')
const { JWT_SECRET, JWT_EXP } = process.env

const createToken = async (data) => {
    try {
        const token = await jwt.sign({
            data: data
        }, JWT_SECRET, { expiresIn: JWT_EXP });
        return token; 
        
    } catch (error) {
        return error
    }
}
 const decodeToken = async (token) => {
    try {
        var decoded = jwt.verify(token, JWT_SECRET)
        console.log("decoded--", decoded)
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