const config = require('./utils/config')
require('express-async-errors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
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
app.use(middleware.tokenExtraction)

app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEnpoint)
app.use(middleware.errorHandler)

module.exports = app