//DB Connection
const mongoose = require('mongoose')

const URL = 'mongodb+srv://dibs:123@cardgame.h3q19.mongodb.net/cardgame?retryWrites=true&w=majority'
mongoose.set('useFindAndModify', false);

const connectDB = async () => {
    await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    await console.log('Database Connected')
}

module.exports = connectDB