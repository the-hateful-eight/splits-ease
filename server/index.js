const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { db } = require('./db')
const PORT = 1337
const app = express()

module.exports = app;

require('../secrets.js')

const createApp = () => {
  app.use(morgan('dev'))
  app.use(bodyParser.json({limit: '50mb'}))
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
  app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}, dude`))
  app.use('/api', require('./api'))
};

db.sync()
createApp()