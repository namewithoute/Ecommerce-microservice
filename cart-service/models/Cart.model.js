const mongoose = require('mongoose')
var connect = require('../config/connect.mongo').connectCart
const Item=require('./Item.model')
const ItemOption = require('./ItemOption.model')
var cartSchema = mongoose.Schema({
    email: String,
    items: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref:Item
        },
        itemOption: {
            type: mongoose.Schema.Types.ObjectId,
            ref:ItemOption
        },
        quantity: Number
    }],
})

module.exports = connect.model('cart', cartSchema)