const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
  const results = await Blog.find({}).populate('user',{ username: 1, name: 1, id: 1 })
  res.json(results)
})

blogRouter.post('/', async (req, res) => {
  const user = req.user
  if(!req.token || !user ) {
    return res.status(401).json({ error: 'token invalid or missing!' })
  }
  const blog = {
    author: req.body.author,
    title: req.body.title,
    likes: req.body.likes || 0,
    url: req.body.url || ''
  }
  blog.user = user._id
  const newBlog = new Blog(blog)
  const result = await newBlog.save()
  result.user = req.user
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  res.status(201).json(result)
})
blogRouter.post('/:id/comments', async (req, res) => {
  const comment = req.body.comment
  if(!comment) {
    return res.status(400).json({ error: 'comment must not be empty' })
  }
  const blog = await Blog.findById(req.params.id).populate('user', { username: 1, name: 1, id: 1 })
  blog.comments = blog.comments.concat(comment)
  const response = await blog.save()
  res.send(response)
})

blogRouter.put('/:id', async (req, res) => {
  const { author, title, likes, url, user } = req.body
  if(!author || !title || !likes) {
    return res.status(400).json({ error: 'missing blog data {[author], [title], [likes]} required' })
  }
  const blog = { author, title, likes }
  if(user) {
    blog.user = user.id
  }
  if(url) {
    blog.url = url
  }

  const response = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true }).populate('user', { username: 1, user: 1, id:1 })
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

  if(blog.user.toString() === req.user._id.toString()) {
    const response = await Blog.findByIdAndRemove(req.params.id)
    if(response === null) {
      return res.status(404).send({ error:'not found' })
    }
    return res.json(response)
  }
  return res.status(401).json('Unauthorized')
})

module.exports = blogRouter
