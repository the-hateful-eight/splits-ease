const Sequelize = require('sequelize')
const pkg = require('../../package.json')
const chalk = require('chalk')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

console.log(chalk.green('Opening database connection'))

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: false
  }
)
module.exports = db