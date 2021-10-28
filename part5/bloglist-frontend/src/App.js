import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import blogService from './services/blogs'
import userService from './services/users'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import AlertMessage from './components/AlertMessage'
import Togglable  from './components/Togglable'
import User from './components/User'
import UsersTable from './components/UsersTable'
import Navbar from './components/Navbar'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(initializeBlogs(blogs))
    })
    userService.getAll().then(users => {
      dispatch(initializeUsers(users))
    })
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if(user) {
      const parsedUser = JSON.parse(user)
      dispatch(initializeUser(parsedUser))
    }
  }, [])
  return (
    <div>
      <AlertMessage />
      {user ? (
        <>
          <Navbar />
          <Switch>
            <Route path="/users/:id">
              <User />
            </Route>
            <Route path="/users">
              <UsersTable />
            </Route>
            <Route path="/blogs/:id">
              <Blog />
            </Route>
            <Route path="/">
              <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm />
              </Togglable>
              <h2>blogs</h2>
              {user && blogs.sort((a,b) => a.likes < b.likes)
                .map(blog =>
                  <div key={blog.id} className='blog-link'>
                    <Link to={`/blogs/${blog.id}`}>
                      {blog.title} {blog.author}
                    </Link>
                  </div>
                )}
            </Route>
          </Switch>
        </>
      ) : <LoginForm />}
    </div>
  )
}

export default App