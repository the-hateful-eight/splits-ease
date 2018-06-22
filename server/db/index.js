const db = require('./db')
const User = require('./models/User')
const Transaction = require('./models/Transaction')
const Item = require('./models/Item')

//associations

module.exports = {
  db,
  User,
  Transaction,
  Item
}