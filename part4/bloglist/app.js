const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
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

app.use(middleware.requestLogger)
// app.use(middleware.unknownEnpoint)

module.exports = app