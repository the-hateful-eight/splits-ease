const db = require('../db')
const Sequelize = require('sequelize')

const Receipt = db.define('receipt', {
  vendor: {
    type: Sequelize.STRING,
  },
  venderAddress: {
    type: Sequelize.Sequelize.STRING,
  },
  receiptImage: {
    type: Sequelize.TEXT,
  }
})

module.exports = Receipt
