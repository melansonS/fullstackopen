const logger = require('./logger')

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

module.exports = {
  unknownEnpoint,
  requestLogger,
  errorHandler
}