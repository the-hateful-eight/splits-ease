const router = require('express').Router()
const { Receipt } = require('../db')
const vision = require('@google-cloud/vision')

const client = new vision.ImageAnnotatorClient()

const fs = require('fs')

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
    fs.writeFile("bk.txt", JSON.stringify(parsed[0]), 'utf8', (err) => console.error(err))
    res.json(parsed[0])
  } catch (err) {
    console.error(err)
    next()
  }
})
