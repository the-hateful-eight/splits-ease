const router = require('express').Router()
<<<<<<< HEAD
const User = require('../db/models')
const Friend = require('../db/models')
=======
const Item = require('../db')
>>>>>>> master

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next)=>{
  try {
    const user = await User.findById(req.params.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/friends', async (req, res, next)=>{
  try{
    const friends = await Friend.findAll({where: {userId: req.params.id}})
    res.json(friends)
  } catch (err) {
    next(err)
  }
})
