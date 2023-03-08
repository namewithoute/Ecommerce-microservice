const { cartRepo } = require("../repository/cart.repo")
const Producer = require('../config/producer.config')
async function cartControllerGET(req, res) {
    try {
        var resData = []
        const cart = await cartRepo(req.cookies.actk)
        if (cart) {
            resData = cart.items.map((item) => {
                return { _idItem: item.item._id, _idOption: item.itemOption._id, itemId: item.item.itemId, name: item.item.name, color: item.itemOption.color, size: item.itemOption.size, img: item.item.img[0], quantity: item.quantity, price: item.item.price }
            })
        }
    }
    catch (e) {
        console.log(e)
        return new Error('Đã có lỗi xảy ra cart function')
    }
    res.render('cartView', { resData: JSON.stringify(resData) })

}
async function cartControllerPOST(req, res) {
    const query = { email: req.user.email, cart: req.body.cart }
    await Producer.getConnection()
    await Producer.assertExchange('addToCart','fanout')
    await Producer.publishMessage('addToCart', query)
    return res.json({ 'status': 1 })

}

async function cartControllerPUT(req, res) {
    const query = { email: req.user.email, cart: req.body.update }
    await Producer.getConnection()
    await Producer.assertExchange('updateCart','fanout')
    await Producer.publishMessage('updateCart', query)
    return res.json({ 'status': 1 })

}
async function cartControllerDelete(req, res) {
    const email = req.user.email
    console.log(email)
    const { itemId, optionId } = req.query
    const query = { email, itemId, optionId }
    if (itemId && optionId) {
        await Producer.getConnection()
        await Producer.assertExchange('deleteItem','fanout')
        await Producer.publishMessage('deleteItem', (query))
        return res.json({ 'status': 1 })
    }
    else {
        await Producer.getConnection()
        await Producer.assertExchange('deleteCart','fanout')
        await Producer.publishMessage('deleteCart', { email: email })
        return res.json({ 'status': 1 })
    }
}


module.exports = { cartControllerPOST, cartControllerGET, cartControllerPUT, cartControllerDelete }