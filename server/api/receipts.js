const router = require('express').Router()
const Receipt = require('../db/models')
const vision = require('@google-cloud/vision')

const client = new vision.ImageAnnotatorClient()

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const receipts = await Receipt.findAll()
    res.json(receipts)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const buffer = Buffer.from(req.body.image, 'base64')
  try {
    const parsed = await client.documentTextDetection(buffer)
    res.json(parsed[0])
  } catch (err) {
    console.error(err)
    next()
  }
})
