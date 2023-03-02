const router = require('express').Router()
const fetch =require('node-fetch')
const {loginControllerPOST } = require('../controllers/login.controller')

router.get('/',function(req,res){
    res.render('loginView')
})
router.post('/',loginControllerPOST)

module.exports=router