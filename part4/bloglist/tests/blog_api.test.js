const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
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
  },
  {
    _id: '6169adae4306900da455af35',
    title: 'Adding an additional test blog',
    author: 'Me',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 25,
    __v: 0
  }
]

const initialUsers = [
  {
    'username': 'bigRed',
    'name': 'red',
    'blogs': [],
    'passwordHash': '$2b$10$VFo1k67gJssi8KQ6YxM55O/JyNqCE67nIIRwaX22kQ24lTDwDgaqy',
    'id': '616db2e707498613ea64fa7d'
  },
  {
    'username': 'bradsley',
    'name': 'trent',
    'blogs': [],
    'passwordHash': '$2b$10$VFo1k67gJssi8KQ6YxM55O/JyNqCE67nIIRwaX22kQ24lTDwDgaqy',
    'id': '616de9e7aac65e2ffa6da601'
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const promiseArray = initialBlogs.map(blog => new Blog(blog).save())
  const userPromiseArray = initialUsers.map(user => new User(user).save())
  userPromiseArray.forEach(promise => promiseArray.push(promise))
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
    expect(blogs).toHaveLength(initialBlogs.length)
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
    expect(blogsAfterUpdate.body).toHaveLength(initialBlogs.length + 1)
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

describe('deleting a blog post', () => {
  test('that the server responds with a 404 when given an unknow id', async () => {
    await api.delete('/api/blogs/6169adae4306900da455af33').expect(404)
  })

  test('that the server responds with a 400 on invalid/malformatted ids', async () => {
    await api.delete('/api/blogs/NotARealId').expect(400)
  })

  test('that a blog post is indeed being removed', async () => {
    await api.delete(`/api/blogs/${initialBlogs[1]._id}`).expect(200)

    const response = await api.get('/api/blogs').expect(200)
    const blogsAfterDelete = response.body
    expect(blogsAfterDelete).toHaveLength(initialBlogs.length - 1)
  })
})

describe('updating a blog post', () => {
  test('that the server responds with a 404 when given an unknow id', async () => {
    await api.put('/api/blogs/6169adae4306900da455af33').send({ author:'updator', title:'updated title', likes:1 }).expect(404)
  })

  test('that the server responds with a 400 on invalid/malformatted ids', async () => {
    await api.put('/api/blogs/notARealId').send({ author:'updator', title:'updated title', likes:1 }).expect(400)
  })
  test('that if there is missing info for the blog, respond with 400', async () => {
    await api.put(`/api/blogs/${initialBlogs[0]._id}`, {}, { new: true }).expect(400)
  })
  test('that the blog post is being correctly updated', async () => {
    const { author, title, likes } = initialBlogs[0]
    const newBlog = { author, title, likes: likes + 1 }
    console.log({ newBlog, id: initialBlogs[0]._id })
    const response = await api.put(`/api/blogs/${initialBlogs[0]._id}`).send(newBlog).expect(200)
    expect(response.body.likes).toBe(likes + 1)
  })
})

describe('when new users are initially loaded', () => {
  test('that we can get the users info', async () => {
    await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/)
  })
})

describe('adding a new user', () => {
  test('a user is correctly added', async () => {
    const newUser = {
      username: 'Tester',
      name:'tom',
      password: '123456'
    }
    await api.post('/api/users').send(newUser).expect(201)
    const response = await api.get('/api/users').expect(200)
    const allUsers = response.body
    expect(allUsers).toHaveLength(initialUsers.length + 1)
  })

  test('a username must be unique', async () => {
    const newUser = { name: 'Newman', username:initialUsers[0].username, password: '1234567' }
    const response = await api.post('/api/users').send(newUser).expect(400)
    expect(response.body.err).toContain('`username` to be unique.')
  })

  test('a new user requires a username', async () => {
    const newUser = { name: 'Newman', password: '12345678' }
    const response = await api.post('/api/users').send(newUser).expect(400)
    expect(response.body.err).toContain('`username` is required')
  })

  test('a new user requires a name', async () => {
    const newUser = { username: 'nervious', password: '12345678' }
    const response = await api.post('/api/users').send(newUser).expect(400)
    expect(response.body.err).toContain('`name` is required')
  })

  test('a new user w/o a password', async () => {
    const newUser =  {
      username: 'Tester',
      name:'tom',
      // password: 't'
    }
    const response = await api.post('/api/users').send(newUser).expect(400)
    expect(response.body.err).toContain('A password longer than 3 characters is required')
  })
})

afterAll(() => {
  console.log('WHEN IS AFTER ALL?? -- before close')
  mongoose.connection.close()
  console.log('WHEN IS AFTER ALL?? -- after close')

})