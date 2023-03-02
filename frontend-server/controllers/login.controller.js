const {getRefreshRepo, getAccessRepo}=require('../repository/auth.repo')
async function loginControllerPOST(req, res) {
    console.log(req.body)
    const {rfs} = await getRefreshRepo(req.body.email,req.body.password)
    if(!rfs){
        return res.redirect('/login')
    }
    var {accessToken}=await getAccessRepo(rfs)
    res.cookie('rfs', rfs,{domain:'localhost',path:'/refresh-token',secure:true})
    res.cookie('actk', accessToken)
    res.redirect('/')
}

module.exports={loginControllerPOST}