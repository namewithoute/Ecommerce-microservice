const mongoose=require('mongoose')

var itemInOrderSchema=mongoose.Schema({
        itemId:String,
        itemName:String,
        color:String,
        size:String,
        quantity:Number,
        price:Number
})
module.exports=mongoose.model('items_in_order',itemInOrderSchema)