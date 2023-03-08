const fetch = require('node-fetch')
function getShippingCost(email,cart) {
    try {
        fetch('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'token': '10fc2278-5f78-11ed-b824-262f869eb1a7'
            },
            body: JSON.stringify({
                "service_type_id": 2,
                "insurance_value": 1000,
                "coupon": null,
                "from_district_id": 1454,
                "to_district_id": userInfo.address.district.ID,
                "to_ward_code": userInfo.address.ward.ID,
                "height": volumeSum.heightSum,
                "length": volumeSum.lengthSum,
                "weight": volumeSum.weightSum,
                "width": volumeSum.widthSum
            })
        })
            .then((res) => {
                return res.json()
            })
            .then(async (result) => {
                console.log(result)
                var user = await userModel.findOne({ email: req.data.email })
                var { firstName, lastName, phone, address } = user
                var formatAddress = `${address.specify}, ${address.ward.name},${address.district.name}, ${address.province.name} `
                var fullName = `${firstName} ${lastName}`
                var shippingFee = result.data.total
                var price = 0
                volumeSum.itemInfo.forEach((item) => {
                    price = price + (item.price * item.quantity)
                })
                var total = price
                await cartModel.findOneAndUpdate({ email: req.data.email }, { shippingFee: result.data.total, total: total })
                res.render('payment', { user: { fullName, formatAddress, phone }, address: { address }, orderAmount: { price, shippingFee, total } })
            })
    }
    catch (e) {
        console.log(e)
    }
}