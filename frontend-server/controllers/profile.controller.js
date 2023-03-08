const { getUserInformation,updateUserInformation } = require("../repository/auth.repo")
const moment = require('moment')
async function profileControllerGET(req,res){
    const {actk}=req.cookies
    var user = await getUserInformation(actk)
    console.log(user)
    user['format']=moment(user.dob).format('DD/MM/YYYY')
    res.render('profileView',{user:user})
}

async function profileControllerPUT(req,res){
    const {actk}=req.cookies
    // console.log(req.body)
    var update = await updateUserInformation(actk,req.body)
    console.log(update)
}

module.exports={profileControllerGET,profileControllerPUT}