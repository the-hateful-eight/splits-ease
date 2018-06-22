const router = require('express').Router();
const Transaction = require('../db/models/Transaction');
const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient()

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (err) {
    next(err);
  }
})

router.post('/', async (req, res, next) => {
  const image = req.body
  const parsed = await client.documentTextDetection({content: image})
  res.json(parsed)
})