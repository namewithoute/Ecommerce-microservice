const mongoose = require('mongoose')

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
module.exports = mongoose.model('item_option', optionSchema)