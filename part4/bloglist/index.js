const mongoose = require('mongoose')
const config = require('./utils/config')

const app = require('./app')
// app.use(cors())
// app.use(express.json())

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

// mongoose.connect(config.MONGODB_URI).then(() => {
//   console.log('connected to database')
// }).catch((err) => {
//   console.error(err)
// })


app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      console.log({ blogs })
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  console.log('REQUST BODY', request.body)
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})