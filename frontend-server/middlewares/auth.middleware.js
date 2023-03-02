const jwt=require('jsonwebtoken')
async function isAuthenticate(req,res,next){
    const {REFRESH_TOKEN_KEY,ACCESS_TOKEN_KEY}=process.env
    const refreshToken=req.cookies.rfs
    const accessToken=req.cookies.actk

    if(!accessToken ){
        return res.redirect('/login')
    }
    jwt.verify(accessToken,ACCESS_TOKEN_KEY,function(err,decoded){
        if(err){
            console.log(err)
            return res.redirect('/refresh-token')
        }
        else{
            console.log(decoded)
            req.user=decoded
            next()
        }
    })

}

module.exports=isAuthenticate