const getAccessController = require('../controllers/getAccess.controller')

const router=require('express').Router()

router.get('/',getAccessController)
module.exports=router