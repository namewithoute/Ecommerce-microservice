const {isAuthenticate, authRestRequest} = require('../middlewares/auth.middleware')
const {profileControllerGET,profileControllerPUT}=require('../controllers/profile.controller')
const router =require('express').Router()

router.get('/',isAuthenticate,profileControllerGET)
router.put('/',authRestRequest,profileControllerPUT)
module.exports=router