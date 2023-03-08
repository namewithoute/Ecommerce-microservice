const mongoose = require('mongoose')
const connect = require('../config/connect.mongo').connectProduct

var optionSchema = mongoose.Schema({
    size: String,
    color: String,
    quantity: Number,
    sold: Number,
    volume: {
        height: Number,
        weight: Number,
        width: Number,
        length: Number,
        _id: false
    }
})
module.exports = connect.model('item_option', optionSchema)