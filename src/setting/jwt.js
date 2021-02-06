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

module.exports = {
    createToken
}