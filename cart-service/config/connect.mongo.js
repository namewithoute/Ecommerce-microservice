const mongoose = require('mongoose')

function connect(url) {
    const db = mongoose.createConnection(url)
    db.on('error', err => {
        console.log(err)
        db.close
    })
    db.once('connected', () => {
        console.log('connected')
    })
    db.on('disconnected', () => {
        console.log('disconnected')
    })
    return db
}


const connectProduct=connect(process.env.MONGO_URL_PRODUCT)
const connectCart=connect(process.env.MONGO_URL_CART)

// function connectSingleton() {
//     var connectCartDB, connectProductDB
//     var connectDB = function () {
//         connectCartDB = connect(process.env.MONGO_URL_CART)
//         connectProductDB = connect(process.env.MONGO_URL_PRODUCT)
//         return connectCartDB,connectProductDB
//     }
//     return {
//         getConnect: function () {
//             if (!connectCartDB && !connectProductDB) {
//                 console.log('new connect')
//                 connectDB()
//             }
//         },
//         getCartDB:function(){
//             return connectCartDB
//         },
//         getProductDB:function(){
//             return connectProductDB
//         }
//     }
// }

module.exports = {
    connectCart,connectProduct
}