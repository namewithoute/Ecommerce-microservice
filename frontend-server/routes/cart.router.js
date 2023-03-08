const {cartControllerGET,cartControllerPOST,cartControllerPUT,cartControllerDelete} = require('../controllers/cart.controller')
const {isAuthenticate,authRestRequest} = require('../middlewares/auth.middleware')

const router=require('express').Router()

router.get('/',isAuthenticate, cartControllerGET)
router.post('/',authRestRequest, cartControllerPOST)
router.put('/',authRestRequest,cartControllerPUT)
router.delete('/',authRestRequest,cartControllerDelete)

module.exports=router