const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  const promiseArray = initialBlogs.map(blog => new Blog(blog).save())
  await Promise.all(promiseArray)
})

describe('when blogs are initally loaded', () => {
  test('that the blogs are returned in the expected json format', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('that there are the correct number of initial blogs', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    expect(blogs.length).toBe(initialBlogs.length)
  })

  test('that the _id field is properly set to id when parsing the mongo data', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()
  })
})

describe('addition of a new note', () => {
  test('that the new blog post is properly added', async () => {
    const newBlog = { author: 'patrick steward' , title: 'jest test blog' }
    await api.post('/api/blogs').send(newBlog).expect(201)

    const blogsAfterUpdate = await api.get('/api/blogs')
    expect(blogsAfterUpdate.body.length).toBe(initialBlogs.length + 1)
  })

  test('that the new blog post has a default value of 0 likes', async () => {
    const newBlog = { author: 'patrick steward' , title: 'jest test blog' }
    const response = await api.post('/api/blogs').send(newBlog).expect(201)
    const blog = response.body
    expect(blog.likes).toBe(0)
  })

  test('that requests without an author and title result in a 400', async () => {
    await api.post('/api/blogs').send({}).expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})