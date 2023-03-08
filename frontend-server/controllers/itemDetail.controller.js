const { itemDetailRepo } = require("../repository/item.repo")
const client = require('../config/connect.redis')
async function itemDetailControllerGET(req, res) {
    // item = await itemDetailRepo(req.params.id)
    // console.log(JSON.stringify(item))
    try {
        const { itemId } = req.params.id
        var isInCache = await client.get(`item_${itemId}`)
        var item
        if(!isInCache){
            item = await itemDetailRepo(req.params.id)
            await client.set(`item_${itemId}`,JSON.stringify(item))
        }
        else{
            item=JSON.parse(isInCache)
        }
    }
    catch (e) {
        return new Error('Đã có lỗi xảy ra')
    }
    return res.render('itemView', { item: item, itemJson: JSON.stringify(item) })
}
module.exports = itemDetailControllerGET