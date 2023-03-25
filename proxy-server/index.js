const express=require('express')
const app = express()
const {createProxyMiddleware}=require('http-proxy-middleware')
app.use(express.json())
app.use(express.urlencoded({extended:false}))

function isAuthenticate(req,res,next){
    console.log(req.body)
    console.log('auth')
    next()
}



app.use('/',createProxyMiddleware({
    target:'http://localhost:3000/',
    changeOrigin:true,
}))




app.listen(3030,()=>{
    console.log('start proxy server at port 3030')
})