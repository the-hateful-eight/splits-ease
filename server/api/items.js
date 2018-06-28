const router = require('express').Router()
const { Item } = require('../db')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log(Item)
    const items = await Item.findAll()
    res.json(items)
  } catch (err) {
    next(err)
  }
})
