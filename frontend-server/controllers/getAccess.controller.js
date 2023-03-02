const {getAccessRepo}=require('../repository/auth.repo')
module.exports=async function(req,res){
    console.log(req.cookies)
    const {accessToken}=await getAccessRepo(req.cookies.rfs)
    console.log(accessToken)
    res.cookie('actk',accessToken)
    res.redirect('/profile')
}