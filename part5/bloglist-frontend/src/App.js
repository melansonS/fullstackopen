import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { displayNotification } from './reducers/notificationReducer'
import blogService from './services/blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import AlertMessage from './components/AlertMessage'
import Togglable  from './components/Togglable'
import { addBlog, deleteBlog, initializeBlogs, likeBlog } from './reducers/blogsReducer'

const App = () => {
  const [user, setUser] = useState()
  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const handleLogin = (user) => {
    setUser(user)
    blogService.setToken(user.token)
    window.localStorage.setItem('user', JSON.stringify(user))
  }

  const handleLogout = () => {
    handleSetAlertMessage('Logged Out!')
    setUser(undefined)
    window.localStorage.removeItem('user')
  }

  const handleCreateBlog = async (blog) => {
    dispatch(addBlog(blog))
  }

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = async (blog) => {
    dispatch(deleteBlog(blog))
  }

  const handleSetAlertMessage = (message, isError) => {
    dispatch(displayNotification(message, isError))
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(initializeBlogs(blogs))
    }
    )
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if(user) {
      const parsedUser = JSON.parse(user)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])
  return (
    <div>
      <AlertMessage />
      {user ? (
        <>
          <button id="logout-button" onClick={handleLogout}>Log out</button>
          <div>{user.username} logged in</div>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={handleCreateBlog}/>
          </Togglable>
          <h2>blogs</h2>
          {blogs.sort((a,b) => a.likes < b.likes)
            .map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                handleDelete={handleDelete}
                handleLike={handleLike}
                username={user && user.username}
              />
            )}
        </>
      ) : <LoginForm handleLogin={handleLogin} handleSetAlertMessage={handleSetAlertMessage}/>}
    </div>
  )
}

export default App