var mongoose = require('mongoose')

var orderSchema=mongoose.Schema({
    orderID:String,
    email:String,
    paymentMethod:String,
    isPaid:{type:Boolean,default:false},
    subtotal:Number,
    shippingFee:Number,
    total:Number,
    note:String,
    voucher:{
        voucherCode:String,
        value:Number
    },
    items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'items_in_order'
    }],
    deliveryStatus:{
        'status':String,
        updateAt:Date
    },
    isCancel:{type:Boolean,default:false},
    shippingAddress:String,
},{timestamps:true})

module.exports=mongoose.model('order',orderSchema)