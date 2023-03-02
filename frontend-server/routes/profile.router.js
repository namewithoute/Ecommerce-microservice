const isAuthenticate = require('../middlewares/auth.middleware')
const {profileControllerGET}=require('../controllers/profile.controller')
const router =require('express').Router()

router.get('/',isAuthenticate,profileControllerGET)
module.exports=router