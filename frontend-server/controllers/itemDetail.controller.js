const { itemDetailRepo } = require("../repository/item.repo")

async function itemDetailControllerGET(req,res){
    const item=await itemDetailRepo(req.params.id)
    console.log(item)
    return res.render('itemView',{item:item,itemJson:JSON.stringify(item)})
}
module.exports=itemDetailControllerGET