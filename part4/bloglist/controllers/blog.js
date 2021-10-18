const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
  const results = await Blog.find({})
  res.json(results)
})

blogRouter.post('/', async (req, res) => {
  const blog = req.body
  blog.likes = 0
  const newBlog = new Blog(blog)
  const result = await newBlog.save()
  res.status(201).json(result)
})

blogRouter.get('/:id', async (req, res) => {
  const response = await Blog.findById(req.params.id)
  res.json(response)
})

module.exports = blogRouter
