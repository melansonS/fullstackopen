const config = require('./utils/config')
const logger = require('./utils/logger')
const app = require('./app')
const middleware = require('./utils/middleware')
const Blog = require('./models/blog')

app.get('/api/blogs', (req, res, next) => {
  Blog.find({}).then((result) => {
    logger.info(result)
    res.json({ result })
  }).catch(err => next(err))
})

app.post('/api/blogs', (req, res, next) => {
  logger.info('POST HIT', req.body)
  const blog = req.body
  blog.likes = 0
  const newBlog = new Blog(blog)
  newBlog.save().then(result => {
    res.status(201).json(result)
  }).catch(err => next(err))
})

app.use(middleware.errorHandler)
app.use(middleware.unknownEnpoint)

app.listen(config.PORT, () => {
  logger.info(`listing on port ${config.PORT}`)
})