const { itemPerPageRepo } = require('../repository/item.repo')
const client = require('../config/connect.redis')
async function homepageControllerGET(req, res) {
    const page = req.query.page || 1
    // items = await itemPerPageRepo(page, req.cookies.actk)

    var isInCache =await client.get(`homepage:${page}`)
    var items
    if(!isInCache){
        console.log('save cache')
        items = await itemPerPageRepo(page,req.cookies.actk)
        await client.set(`homepage:${page}`,JSON.stringify(items))
    }
    else{
        items=JSON.parse(isInCache)
        console.log('get from cache')
    }
    console.log(items)
    res.render('homepageView', { res: items })
}

module.exports = { homepageControllerGET }