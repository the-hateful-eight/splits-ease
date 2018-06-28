const router = require('express').Router()
module.exports = router

router.use('/receipts', require('./receipts'))
router.use('/items', require('./items'))
router.use('/user', require('./user'))
