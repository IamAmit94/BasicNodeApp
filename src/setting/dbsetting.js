const mongoose =  require('mongoose')
const {DBNAME} = process.env
mongoose.connect(`mongodb://127.0.0.1:27017/${DBNAME}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
})
