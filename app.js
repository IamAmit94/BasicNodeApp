const express = require('express')
const bodyParser = require('body-parser')
require ('dotenv').config()


// import module from inside
const dbsetting = require('./src/setting/dbsetting')
const routes = require('./src/router/routes')


const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes)



app.listen(process.env.PORT || 4000, ()=> {
console.log('Server is running on ', process.env.PORT)
})