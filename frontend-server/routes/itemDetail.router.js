const router = require('express').Router()
const itemController = require('../controllers/itemDetail.controller')
router.get('/:id', itemController)
module.exports = router