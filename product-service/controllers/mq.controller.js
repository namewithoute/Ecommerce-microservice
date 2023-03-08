const consume = require('../config/consumer.mq')
const producer= require('../config/producer.mq')
const { startSession, default: mongoose } = require('mongoose')
const ItemOption = require('../models/ItemOption.model')
async function consumer(msg) {
    var data = JSON.parse(msg.content.toString())
    const session = await startSession()
    var { items } = data.userCart
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
        session.commitTransaction()
    }
    catch (e) {
        console.log(e)
    }
    session.endSession();
}

module.exports = consume('product', consumer)