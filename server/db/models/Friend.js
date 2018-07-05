const db = require('../db')
const Sequelize = require('sequelize')

const Friend = db.define('friend', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    // unique: true
  },
  email: {
    type: Sequelize.STRING,
    // unique: true
  },
  phone: {
    type: Sequelize.STRING,
    // unique: true
  },
  avatar: {
    type: Sequelize.STRING,
  }
})

module.exports = Friend
