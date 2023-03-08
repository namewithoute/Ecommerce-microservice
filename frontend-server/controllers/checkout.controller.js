const consumer = require("../../product-service/config/consumer.mq")
const producerConfig = require("../config/producer.config")
const { getUserInformation } = require("../repository/auth.repo")
const { cartRepo } = require("../repository/cart.repo")
const { itemBuy } = require('../repository/item.repo')
const SHIPPING_FEE = 30000
async function checkoutControllerGET(req, res) {
    const { actk } = req.cookies
    var user = await getUserInformation(actk)
    var userCart = await cartRepo(actk)
    console.log(userCart)
    var price = 0
    if(!userCart){
        return res.redirect('/cart')
    }
    userCart.items.forEach((item) => {
        price = price + (item.item.price * item.quantity)
    })

    console.log(price)
    var { firstName, lastName, phone, address } = user
    var formatAddress = `${address.specify}, ${address.ward.name},${address.district.name}, ${address.province.name} `
    var fullName = `${firstName} ${lastName}`
    var total = price + SHIPPING_FEE
    req.session.address = formatAddress
    res.render('checkoutView', { user: { fullName, formatAddress, phone }, address: { address }, orderAmount: { price, shippingFee: SHIPPING_FEE, total } })
}

async function checkoutControllerPOST(req, res) {
    const { actk } = req.cookies
    var userCart = await cartRepo(actk)
    userCart['option'] = req.body
    var shippingAddress = req.session.address
    console.log(shippingAddress)
    var message = await itemBuy(actk, { userCart, shippingFee: SHIPPING_FEE, shippingAddress: shippingAddress })
    return res.json(message)
    // await producerConfig.getConnection()
    // await producerConfig.assertExchange('product')
    // await producerConfig.publishMessage('product',{userCart,option:req.body})


}





module.exports = { checkoutControllerGET, checkoutControllerPOST }