const jwt = require('jsonwebtoken')

async function generateRefresh(data, key) {
    try{
        var token =await jwt.sign(data,key,{expiresIn:'7d'})
    }
    catch(e){
        console.log(e)
        return new Error('Đã có lỗi xảy ra vui lòng thử lại')
    }
    return token
}

async function generateAccess(data, key) {
    try{
        var token =await jwt.sign(data,key,{expiresIn:'1h'})
    }
    catch(e){
        console.log(e)
        return new Error('Đã có lỗi xảy ra vui lòng thử lại')
    }
    return token
}


module.exports={generateRefresh,generateAccess}