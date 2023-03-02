const router = require('express').Router()
const {homepageControllerGET} = require('../controllers/homepage.controller')


router.get('/', homepageControllerGET)


module.exports = router