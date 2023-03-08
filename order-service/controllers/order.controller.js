const consumer = require('../config/consumer.mq')
const OrderBuilder = require('../pattern/OrderBuilder.pattern')
const ItemInOrderBuider = require('../pattern/ItemInOrderBuilder.pattern')
async function orderConsumer(msg) {
    var data = JSON.parse(msg.content.toString())
    var cart = JSON.parse(msg.content.toString()).userCart
    var orderBuilder = new OrderBuilder()
    var subtotal=0
    cart.items.forEach((item) => {
        subtotal += item.item.price
        var itemInOrderBuilder = new ItemInOrderBuider()
        var build = itemInOrderBuilder.setItemId(item.item.itemId)
            .setItemName(item.item.name)
            .setColor(item.itemOption.color)
            .setSize(item.itemOption.size)
            .setQuantity(item.quantity)
            .setPrice(item.item.price).build();
        // console.log(build)
        orderBuilder.addItem(build._id)
        console.log(build)
        build.save()
    })
    var orderBuild=orderBuilder.setEmail(cart.email)
        .setDeliveryStatus('pending')
        .setIsCancel(false)
        .setIsPaid(false)
        .setNote(cart.option.note)
        .setPaymentMethod(cart.option.paymentOption)
        .setVoucher(cart.option.voucher, 0)
        .setShippingAddress(data.shippingAddress)
        .setShippingFee(data.shippingFee)
        .setTotal(subtotal + data.shippingFee)
        .setSubtotal(subtotal).build()
    orderBuild.save()
    // orderBuilder.setEmail()
}

module.exports = consumer('order', orderConsumer)