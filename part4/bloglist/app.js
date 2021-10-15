const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

logger.info('connecting to Mongo')

mongoose.connect(config.MONGODB_URI).then(() => {
  logger.info('connected to DB!')
}).catch(err => {
  logger.error(err)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

module.exports = app