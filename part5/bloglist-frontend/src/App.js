import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import AlertMessage from './components/AlertMessage'
import Togglable  from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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

  const handleSetAlertMessage = (message, isError) => {
    if(isError) {
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else {
      setMessage(message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
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
      {message && <AlertMessage message={message} />}
      {errorMessage && <AlertMessage error message={errorMessage}/>}
      {user ? (
        <>
          <button onClick={handleLogout}>Log out</button>
          <div>{user.username} logged in</div>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={handleCreateBlog}/>
          </Togglable>
          <h2>blogs</h2>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </>
      ) : <LoginForm handleLogin={handleLogin} handleSetAlertMessage={handleSetAlertMessage}/>}
    </div>
  )
}

export default App