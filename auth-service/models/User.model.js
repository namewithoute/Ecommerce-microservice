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
    gender:Number,
    role:{type:Number,default:1},
    dob:Date,
    isVerify:{type:Boolean,default:false},
},{timestamps:true})

userShema.pre('save',async function(next){
    this.password= await bcrypt.hash(this.password,10)
    next()
})
// userSchema.pre('findOne',async function(next){
//     this.password
// })

var userModel = mongoose.model('user',userShema)
module.exports=userModel