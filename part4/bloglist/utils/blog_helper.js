const jwt = require('jsonwebtoken')
const config = require('./config')
const User = require('../models/user')
const extractUserAuthToken = async (username) => {
  const user = await User.findOne({ username })
  const token = await jwt.sign(JSON.parse(JSON.stringify(user)), config.SECRET)
  return `bearer ${token}`
}

module.exports = { extractUserAuthToken }