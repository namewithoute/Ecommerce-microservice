const { registerControllerGET, registerControllerPOST } = require('../controllers/register.controller')

const router = require('express').Router()

router.get('/',registerControllerGET)
router.post('/',registerControllerPOST)
module.exports=router