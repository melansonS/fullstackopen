const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (req, res, next) => {
  Blog.find({}).then((result) => {
    res.json(result)
  }).catch(err => next(err))
})

blogRouter.post('/', (req,res, next) => {
  const blog = req.body
  blog.likes = 0
  const newBlog = new Blog(blog)
  newBlog.save().then(result => {
    res.status(201).json(result)
  }).catch(err => next(err))
})

module.exports = blogRouter
