const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
  const results = await User.find({})
  res.json(results)
})

userRouter.post('/', async (req, res) => {
  const body = req.body
  const saltRounds = 10

  if(!body.password || body.password.length < 3) {
    res.status(400).json({ err: 'A password longer than 3 characters is required' })
  } else {
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const newUser = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  }

})

module.exports = userRouter