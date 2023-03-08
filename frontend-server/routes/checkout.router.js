const router=require('express').Router()
const {checkoutControllerGET,checkoutControllerPOST}=require('../controllers/checkout.controller')
const { isAuthenticate, authRestRequest } = require('../middlewares/auth.middleware')
router.get('/',isAuthenticate,checkoutControllerGET)
router.post('/',authRestRequest,checkoutControllerPOST)
module.exports=router