const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

console.log('connecting to Mongo')

mongoose.connect(config.MONGODB_URI).then(() => {
  console.log('connected to DB!')
}).catch(err => {
  console.log(err)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

module.exports = app