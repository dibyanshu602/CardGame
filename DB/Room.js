const mongoose = require('mongoose')

const room = new mongoose.Schema({
    //Will be added to db
    n: Number,
    cardstate: [Number],
    userpoints: [Number],
    usercards: [[Number]]
});

const roomexp = mongoose.model('room', room)

module.exports = roomexp