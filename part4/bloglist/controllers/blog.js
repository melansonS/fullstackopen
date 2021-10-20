const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (req, res) => {
  const results = await Blog.find({}).populate('user',{ username: 1, name: 1, id: 1 })
  res.json(results)
})

blogRouter.post('/', async (req, res) => {
  const blog = req.body
  if(blog.likes === undefined) {
    blog.likes = 0
  }
  const users = await User.find({})
  const firstUser = users[1]
  blog.user = firstUser._id
  const newBlog = new Blog(blog)
  const result = await newBlog.save()
  firstUser.blogs = firstUser.blogs.concat(result._id)
  await firstUser.save()
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
  const response = await Blog.findByIdAndRemove(req.params.id)
  if(response === null) {
    return res.status(404).send({ error:'not found' })
  }
  res.json(response)
})

module.exports = blogRouter
