const express=require('express')
const app = express()
require('dotenv').config()
const {PORT,MONGO_URL}=process.env
require('./controllers/order.controller')
require('./config/connect.mongo')(MONGO_URL)

app.listen(PORT,()=>{
    console.log(`order service listen at port ${PORT}`)
})
