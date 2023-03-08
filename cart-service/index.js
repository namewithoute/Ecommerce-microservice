const express = require('express')
const app = express()
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { PORT, ACCESS_TOKEN_KEY } = process.env
// require('./config/connect.mongo').initCartDB(process.env.MONGO_URL_CART)
// require('./config/connect.mongo').connectCart
require('./config/connect.mongo')

require('./controllers/cart.controller')

const Cart = require('./models/Cart.model')
const Item=require('./models/Item.model')
const cookieParser = require('cookie-parser')

app.use(cookieParser())



async function isAuthenticate(req, res, next) {
    const authorization = req.headers.authorization
    if (!authorization) {
        return res.status(401).json({ 'status': 401, message: 'Token is required' })
    }
    const token = authorization.split(' ')[1]
    try {
        var user = await jwt.verify(token, ACCESS_TOKEN_KEY)
    }
    catch (e) {
        console.log(e)
        return res.status(401).json({ 'status': 401, message: 'Unauthorization' })
    }
    req.user = user
    next()
}

app.get('/cart/get-item', isAuthenticate, async (req, res) => {
    try {
        const cart = await Cart.findOne({ email: req.user.email }).populate('items.item').populate('items.itemOption','-volume')
        res.json(cart)
    }
    catch (e) {
        console.log(e)
        return res.json(e.message)
    }
})


app.listen(PORT, () => {
    console.log(`cart service listen at port ${PORT}`)
})