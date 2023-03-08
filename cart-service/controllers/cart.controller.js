const { default: mongoose } = require('mongoose')
const consumer = require('../config/consumer.mq')
const Cart = require('../models/Cart.model')
async function addToCartController(msg) {
  try {
    var { cart, email } = JSON.parse(msg.content.toString())
    console.log(email)
    // console.log(JSON.parse(msg.content.toString()))
    const itemId = new mongoose.Types.ObjectId(cart._id)
    const optionId = new mongoose.Types.ObjectId(cart.optionId)
    var findUserCart = await Cart.findOne({ email: email, 'items.item': itemId, 'items.itemOption': optionId })
    if (findUserCart && findUserCart.items) {
      //findOneAndUpdate have some error when upsert array, use $setOnInsert to upsert if invalid value
      await Cart.findOneAndUpdate({ email: email, 'items.item': itemId, 'items.itemOption': optionId }, {
        $inc: { 'items.$.quantity': cart.quantity },
        // $setOnInsert: {
        //   $push: {
        //     items:
        //     {
        //       item: itemId,
        //       itemOption: optionId,
        //       quantity: cart.quantity,
        //     }
        //   },
        // }
      }, { new: true })
    }
    else {
      await Cart.findOneAndUpdate({
        email: email
      }, {
        $push: {
          items: {
            item: itemId,
            itemOption: optionId,
            quantity: cart.quantity,
          }
        }
      }, { upsert: true })
    }
  }
  catch (e) {
    console.log(e)
    return new Error('Đã có lỗi xảy ra, vui lòng kiểm tra lại')
  }
}

async function updateCart(msg) {
  const data = JSON.parse(msg.content.toString())
  var { email, cart } = data
  const idItem = new mongoose.Types.ObjectId(cart[0]._idItem)
  const _idOption = new mongoose.Types.ObjectId(cart[0]._idOption)
  await Cart.updateOne({ email: email, 'items.item': idItem, 'items.itemOption': _idOption }, { 'items.$.quantity': cart[0].quantity })
}

async function deleteItem(msg) {
  var { email, itemId, optionId } = JSON.parse(msg.content.toString())
  itemId = new mongoose.Types.ObjectId(itemId)
  optionId = new mongoose.Types.ObjectId(optionId)
  await Cart.updateOne({ email: email }, { $pull: { items: { item: itemId, itemOption: optionId } } })
}

async function deleteCart(msg) {
  var data = JSON.parse(msg.content.toString())
  var email = data.email ? data.email : data.userCart.email
  await Cart.deleteOne({ email: email })
}



module.exports = [
  consumer('addToCart', addToCartController),
  consumer('updateCart', updateCart),
  consumer('deleteItem', deleteItem),
  consumer('deleteCart',deleteCart),
  consumer('order',deleteCart)
]
