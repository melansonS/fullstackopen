const logger = require('./logger')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const User = require('../models/user')

const unknownEnpoint = (req, res) => {
  logger.error('Unknown enpoint', req.path)
  res.status(404).json({ error:'unkown endpoint' })
}

const requestLogger = (req, res, next) => {
  logger.info(`${req.method} - ${req.path} - ${JSON.stringify(req.body)}`)
  next()
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ err: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ err: err.message })
  }

  next(err)
}

const tokenExtraction = (req, res, next) => {
  const authorization = req.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  next()
}

const userExtractor = async (req, res, next) => {
  const token = req.token
  if(token) {
    const decodedToken = jwt.verify(token, config.SECRET)
    if(decodedToken.id) {
      const user = await User.findById(decodedToken.id)
      req.user = user
    }
  }
  next()
}

module.exports = {
  unknownEnpoint,
  requestLogger,
  errorHandler,
  tokenExtraction,
  userExtractor
}