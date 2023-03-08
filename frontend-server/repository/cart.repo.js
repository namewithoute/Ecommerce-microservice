const fetch = require('node-fetch')
async function cartRepo(accessToken) {
    try {
        const getCart = await fetch(`http://localhost:3003/cart/get-item`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        })
        const cart = await getCart.json()
        return cart
    }
    catch (e) {
        console.log(e)
    }
}


module.exports = { cartRepo }