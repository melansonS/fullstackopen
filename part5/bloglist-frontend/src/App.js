import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import blogService from './services/blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import AlertMessage from './components/AlertMessage'
import Togglable  from './components/Togglable'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser, logUserOut } from './reducers/userReducer'
import UsersTable from './components/UsersTable'
import userService from './services/users'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const handleLogout = () => {
    dispatch(logUserOut())
  }
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
          <button id="logout-button" onClick={handleLogout}>Log out</button>
          <div>{user.username} logged in</div>
          <Switch>
            <Route path="/users">
              <UsersTable />
            </Route>
            <Route path="/">
              <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm />
              </Togglable>
              <h2>blogs</h2>
              {user && blogs.sort((a,b) => a.likes < b.likes)
                .map(blog =>
                  <Blog
                    key={blog.id}
                    blog={blog}
                    username={user.username}
                  />
                )}
            </Route>
          </Switch>
        </>
      ) : <LoginForm />}
    </div>
  )
}

export default App