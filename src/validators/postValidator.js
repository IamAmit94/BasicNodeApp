const joi =  require('joi')

const createPost = joi.object().keys({
    title: joi.string().required(),
    description: joi.string().required(),
    image: joi.string()
})

module.exports = {

    createPost
}