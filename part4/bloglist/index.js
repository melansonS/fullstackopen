const config = require('./utils/config')
const logger = require('./utils/logger')
const app = require('./app')
const Blog = require('./models/blog')

app.get('/api/blogs', (req, res) => {
  Blog.find({}).then((result) => {
    logger.info(result)
    res.json({ result })
  }).catch(err => {
    logger.error(err)
    res.status(400).json({ error: err.message })
  })
})

app.post('/api/blogs', (req, res) => {
  logger.info('POST HIT', req.body)
  const blog = req.body
  blog.likes = 0
  const newBlog = new Blog(blog)
  newBlog.save().then(result => {
    res.status(201).json(result)
  }).catch(err => {
    logger.error(err)
    res.status(400).json({ error: err.message })
  })
})

app.listen(config.PORT, () => {
  logger.info(`listing on port ${config.PORT}`)
})