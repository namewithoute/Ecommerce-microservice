const jwt=require('jsonwebtoken')
async function isAuthenticate(req,res,next){
    const {REFRESH_TOKEN_KEY,ACCESS_TOKEN_KEY}=process.env
    const refreshToken=req.cookies.rfs
    const accessToken=req.cookies.actk

    if(!accessToken){
        return res.redirect('/login')
    }
    jwt.verify(accessToken,ACCESS_TOKEN_KEY,function(err,decoded){
        if(err){
            return res.redirect('/refresh-token')
        }
        else{
            req.user=decoded
            next()
        }
    })

}


async function authRestRequest(req,res,next){
    const {REFRESH_TOKEN_KEY,ACCESS_TOKEN_KEY}=process.env
    const refreshToken=req.cookies.rfs
    const accessToken=req.cookies.actk

    if(!accessToken){
        return res.json({err:1})
    }
    jwt.verify(accessToken,ACCESS_TOKEN_KEY,function(err,decoded){
        if(err){
            return res.json({err:1})
        }
        else{
            req.user=decoded
            next()
        }
    })
}

module.exports={isAuthenticate,authRestRequest}