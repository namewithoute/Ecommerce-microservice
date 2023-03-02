const {itemPerPageRepo}=require('../repository/item.repo')

async function homepageControllerGET(req,res){
    const page = req.query.page || 1
    console.log(page)
    var items = await itemPerPageRepo(page,req.cookies.actk)
    console.log(items)
    res.render('homepageView',{res:items})
}

module.exports={homepageControllerGET}