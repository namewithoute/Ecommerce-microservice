const mongoose = require('mongoose')

var optionSchema = mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
        required: true
    },
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