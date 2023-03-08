const express = require('express')
const app = express()
require('dotenv').config()
const { PORT } = process.env || 3002 //
const jwt = require('jsonwebtoken')
require('./config/connect.mongo')(process.env.MONGO_URL)
const Item = require('./models/Item.model')
require('./controllers/mq.controller')
const ItemOption = require('./models/ItemOption.model')
const { startSession, default: mongoose } = require('mongoose')
const producerConfig = require('../frontend-server/config/producer.config')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

async function isAuthenticate(req, res, next) {
    const authorization = req.headers.authorization
    if (!authorization) {
        return res.status(401).json({ 'status': 401, message: 'Token is required' })
    }
    const token = authorization.split(' ')[1]
    try {
        var user = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
    }
    catch (e) {
        return res.status(401).json({ 'status': 401, message: 'Unauthorization' })
    }
    req.user = user
    next()
}

app.get('/product/get-all', async function (req, res) {
    try {
        const page = req.query.page - 1
        const items = await Item.find().skip(page * 8).limit(8)
        return res.status(200).json(items)
    }
    catch (e) {
        return res.status(400).json({ 'status': 400, message: 'Trang không tồn tại' })
    }
})

app.get('/product/:id', async function (req, res) {
    try {
        const id = req.params.id
        const item = await Item.findById(id).populate('itemOptions')
        console.log(item)
        return res.status(200).json(item)
    }
    catch (e) {
        return res.status(400).json({ 'status': 400, message: 'Sản phẩm không tồn tại' })
    }
})

app.post('/product/buy', isAuthenticate, async function (req, res) {
    var data = req.body.userCart
    const session = await startSession()
    var { items } = data
    const {email}=req.user
    if(!items){
        return res.json({'status':400,message:e.message})
    }
    try {
        session.startTransaction()
        for (let i = 0; i < items.length; i++) {
            console.log(items[i].itemOption)
            var afterUpdate = await ItemOption.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(items[i].itemOption._id) },
                { $inc: { quantity: -items[i].quantity, sold: items[i].quantity } },
                { session, new: true })
            console.log(afterUpdate)
            if (afterUpdate.quantity < 0) {
                throw new Error('Out of stock error')
            }
        }
        await session.commitTransaction()
    }
    catch (e) {
        console.log(e)
        await session.abortTransaction()
        session.endSession();
        console.log(e.message)
        return res.json({'status':400,message:e.message})
    }
    session.endSession();
    console.log(req.body)
    res.json({'status':200,'message':'buy success'})
    await producerConfig.getConnection()
    await producerConfig.assertExchange('order')
    await producerConfig.publishMessage('order',req.body)
    // return res.json({'status':200,message:'')
})

app.listen(PORT, () => {
    console.log('product service listen at port ' + PORT)
})

