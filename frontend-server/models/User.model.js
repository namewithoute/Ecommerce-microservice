var mongoose =require('mongoose')
const bcrypt=require('bcrypt')
var userShema= mongoose.Schema({
    email:String,
    phone:String,
    password:String,
    typeLogin:String,
    firstName:String,
    lastName:String,
    status:{type:Boolean,default:true},
    gender:String,
    role:{type:Number,default:1},
    address:{
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
    },
    dob:Date,
    isVerify:{type:Boolean,default:false},
},{timestamps:true})

userShema.pre('save',async function(next){
    this.password=await bcrypt.hash(this.password,10)
    console.log(this.password)
    next()
})

var userModel = mongoose.model('user',userShema)
module.exports=userModel