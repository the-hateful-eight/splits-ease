const db = require('../db');
const Sequelize = require('sequelize');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

module.exports = User;
