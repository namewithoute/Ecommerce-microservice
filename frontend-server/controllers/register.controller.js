const {registerRepo}=require('../repository/auth.repo')
async function registerControllerGET(req,res,next){
    return res.render('registerView')
}

async function registerControllerPOST(req,res,next){
    const {status,message,errors,data}=await registerRepo(req.body)
    if(status==200){
        req.session.flash={status:status,message:message}
        return res.redirect('/login')
    }
    else if(status==400){
        console.log(data)
        var preFormatErrorsToClient=errors.map((error)=>{
            const {msg,param}=error            
            return {msg,param}
        })
        console.log(preFormatErrorsToClient)
        req.session.flash={status:status,message:message,errors:preFormatErrorsToClient,data}
        res.redirect('/register')
    }
}

module.exports={registerControllerGET,registerControllerPOST}