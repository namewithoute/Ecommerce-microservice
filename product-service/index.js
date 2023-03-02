const express=require('express')
const app = express()
require('dotenv').config()
const {PORT}=process.env ||3002
const jwt=require('jsonwebtoken')
require('./config/connect.mongo')(process.env.MONGO_URL)
const Item = require('./models/Item.model')
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

app.get('/product/get-all',isAuthenticate,async function(req,res){
    const items= await Item.find()
    console.log(items)
})


app.listen(PORT,()=>{
    console.log('product service listen at port '+ PORT)
})

