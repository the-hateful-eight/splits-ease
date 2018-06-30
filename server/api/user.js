const router = require('express').Router()
const { User, Friend } = require('../db')

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const user = await User.findOrCreate({
      where: {
        email: req.body.email
      },
      defaults: req.body
   })
    if (user[1]) {
      res.json(user[0])
    } else {
      const err = new Error('User already exists!')
      err.status = 401
      next(err)
    }
  // try {
  //   const user = await User.create(req.body)
  //   res.json(user)
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

router.get('/:id/friends', async (req, res, next) => {
  try {
    const friends = await Friend.findAll({ where: { userId: req.params.id } })
    res.json(friends)
  } catch (err) {
    next(err)
  }
})

router.post('/:id/friends', async (req, res, next) => {
  try {
    const friend = await Friend.findOrCreate({
      where: {
        name: req.body.name
      },
      defaults: req.body
    })
    if (friend[1]) {
      res.json(friend[0])
    } else {
      const err = new Error('Friend already exists!')
      err.status = 401
      next(err)
    }
  } catch (err) {
    next(err)
  }
})


