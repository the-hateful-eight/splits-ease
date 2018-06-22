const db = require('../db');
const Sequelize = require('sequelize');

const Transaction = db.define('transaction', {
  vendor: {
    type: Sequelize.STRING,
    allowNull: false
  },
  venderAddress: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true
  },
  receiptImage: {
    type: Sequelize.TEXT,
    allowNull: true
  }
});

module.exports = Transaction;
