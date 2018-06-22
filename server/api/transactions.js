const router = require('express').Router();
const Transaction = require('../db/models/Transaction');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (err) {
    next(err);
  }
})