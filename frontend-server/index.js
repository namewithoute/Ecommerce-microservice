const express= require('express')
const app = express()
const loginRouter=require('./routes/login.router')
const registerRoute=require('./routes/register.router')
const homepageRouter=require('./routes/homepage.router')
const profileRouter=require('./routes/profile.router')
const getAccessRouter=require('./routes/getAccessToken.router')
const cookieParser=require('cookie-parser')
const session=require('express-session')
require('dotenv').config()
const PORT= process.env.PORT

app.use(session({
    secret:'H4RDT0GU33S',
    saveUninitialized:true,
    resave:true
}))
app.use(express.static(__dirname + '/public/'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use((req,res,next)=>{
    const flash=req.session.flash
    if(flash){
        res.locals.flash=JSON.stringify(flash)
    }
    delete req.session.flash
    next()
})

app.use('/',homepageRouter)
app.use('/login',loginRouter)
app.use('/register',registerRoute)
app.use('/profile',profileRouter)
app.use('/refresh-token',getAccessRouter)
app.listen(PORT,function(){
    console.log(`ecommerce project listen at port ${PORT}`)
})