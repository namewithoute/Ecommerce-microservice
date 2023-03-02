const mongoose =require('mongoose')
var addressSchema=mongoose.Schema({
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        province:{
            name:String,
            ID:Number
        },
        district:{
            name:String,
            ID:Number
        },
        ward:{
            name:String,
            ID:String
        },
        specify:String
})
module.exports=mongoose.model('address',addressSchema)