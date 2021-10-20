const blogRouter = require('express').Router()
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (req, res) => {
  const results = await Blog.find({}).populate('user',{ username: 1, name: 1, id: 1 })
  res.json(results)
})

blogRouter.post('/', async (req, res) => {
  const decodedToken = jwt.verify(req.token, config.SECRET)
  if(!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token invalid or missing!' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = {
    author: req.body.author,
    title: req.body.title,
    likes: req.body.likes || 0
  }
  blog.user = user._id
  const newBlog = new Blog(blog)
  const result = await newBlog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  res.status(201).json(result)
})

blogRouter.put('/:id', async (req, res) => {
  const { author, title, likes } = req.body
  if(!author || !title || !likes) {
    return res.status(400).json({ error: 'missing blog data {[author], [title], [likes]} required' })
  }
  const blog = { author, title, likes }

  const response = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  if(response === null) {
    return res.status(404).send({ error:'not found' })
  }
  res.send(response)
})

blogRouter.get('/:id', async (req, res) => {
  const response = await Blog.findById(req.params.id)
  res.json(response)
})

blogRouter.delete('/:id', async (req, res) => {
  if(!req.token) {
    return res.status(401).json({ error:'token invalid or missing!' })
  }
  const blog = await Blog.findById(req.params.id)
  if(blog === null) {
    return res.status(404).send({ error:'not found' })
  }
  const decodedToken = jwt.verify(req.token, config.SECRET)

  if(blog.user.toString() === decodedToken.id) {
    const response = await Blog.findByIdAndRemove(req.params.id)
    if(response === null) {
      return res.status(404).send({ error:'not found' })
    }
    return res.json(response)
  }
  return res.status(401).json('Unauthorized')
})

module.exports = blogRouter
