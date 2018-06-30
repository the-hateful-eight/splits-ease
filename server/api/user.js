const router = require('express').Router()
const { User, Friend } = require('../db')

module.exports = router

router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    })
    console.log('here')
    if (user) {
      res.send(user)
    } else {
      const err = new Error('Wrong email and/or password')
      err.status = 401
      next(err)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/friends', async (req, res, next) => {
  try {
    const friends = await Friend.findAll({ where: { userId: req.params.id } })
    await console.log('FRIENDS ARE', friends)
    res.json(friends)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})


