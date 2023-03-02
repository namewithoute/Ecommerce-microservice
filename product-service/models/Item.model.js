const mongoose=require('mongoose')

var itemSchema=mongoose.Schema({
    itemId:String,
    name:String,
    category:String,
    brand:String,
    price:Number,
    description:String,
    img:[String],
    itemOptions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'item_option'
    }]
})
module.exports=mongoose.model('item',itemSchema)