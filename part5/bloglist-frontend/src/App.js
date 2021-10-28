import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { displayNotification } from './reducers/notificationReducer'
import blogService from './services/blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import AlertMessage from './components/AlertMessage'
import Togglable  from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()

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
    try {
      const created = await blogService.create(blog)
      if(created) {
        setBlogs([...blogs, created])
        handleSetAlertMessage(`a new blog ${blog.title} by ${blog.author} added!`)
        blogFormRef.current.toggleVisibility()
      }
    } catch (err) {
      console.log(err)
      handleSetAlertMessage('something went wrong while trying to add the blog!', true)
    }
  }

  const handleLike = async (blog) => {
    try {
      const liked = await blogService.like(blog)
      const blogIndex = blogs.findIndex(b => b.id === blog.id)
      const newBlogArray = [...blogs]
      newBlogArray[blogIndex] = liked
      handleSetAlertMessage('you liked :D')
      setBlogs(newBlogArray)
    } catch (err) {
      console.log(err)
      handleSetAlertMessage('something went wrong while trying to Like this blog!', true)
    }
  }

  const handleDelete = async (blog) => {
    try {
      const deletedBlog = await blogService.deleteBlog(blog)
      const fileteredBlogs = blogs.filter(blog => blog.id !== deletedBlog.id)
      setBlogs(fileteredBlogs)
      handleSetAlertMessage(`blog: ${blog.title} has been removed`)
    } catch (err) {
      console.log(err)
      handleSetAlertMessage('something went wrong while deleting this blog...', true)
    }
  }

  const handleSetAlertMessage = (message, isError) => {
    dispatch(displayNotification(message, isError))
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
            .map(blog => <Blog
              key={blog.id}
              blog={blog}
              handleDelete={handleDelete}
              handleLike={handleLike}
              username={user && user.username}
            />)}
        </>
      ) : <LoginForm handleLogin={handleLogin} handleSetAlertMessage={handleSetAlertMessage}/>}
    </div>
  )
}

export default App