const db = require('../db')
const Sequelize = require('sequelize')

const Friend = db.define('friend', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING
  }
})

module.exports = Friend
