const express=require('express')
const app = express()
require('dotenv').config()
const {PORT}=process.env ||3002
const jwt=require('jsonwebtoken')
require('./config/connect.mongo')(process.env.MONGO_URL)
const Item = require('./models/Item.model')
const ItemOption=require('./models/ItemOption.model')
app.use(express.json())
app.use(express.urlencoded({extended:false}))

async function isAuthenticate(req,res,next){
    const authorization = req.headers.authorization
    if(!authorization){
        return res.status(401).json({'status':401,message:'Token is required'})
    }
    const token=authorization.split(' ')[1]
    try{
        var user = await jwt.verify(token,process.env.ACCESS_TOKEN_KEY)
    }
    catch(e){
        return res.status(401).json({'status':401,message:'Unauthorization'})
    }
    req.user=user
    next()
}

app.get('/product/get-all',async function(req,res){
    try{
    const page =req.query.page - 1
    const items= await Item.find().skip(page*8).limit(8)
    return res.status(200).json(items)
    }
    catch(e){
        return res.status(400).json({'status':400,message:'Trang không tồn tại'})
    }
})

app.get('/product/:id',async function(req,res){
    try{
        
    const item= await Item.findOne({itemId:req.params.id}).populate('itemOptions')

    return res.status(200).json(item)
    }
    catch(e){
        return res.status(400).json({'status':400,message:'Sản phẩm không tồn tại'})
    }
})

app.listen(PORT,()=>{
    console.log('product service listen at port '+ PORT)
})

