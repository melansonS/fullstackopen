import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()

  const handleLogin = (user) => {
    setUser(user)
    blogService.setToken(user.token)
    window.localStorage.setItem('user', JSON.stringify(user))
  }

  const handleLogout = () => {
    setUser(undefined)
    window.localStorage.removeItem('user')
  }

  const handleCreateBlog = async (blog) => {
    const created = await blogService.create(blog)
    if(created) {
      setBlogs([...blogs, created])
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
      <LoginForm handleLogin={handleLogin}/>
      {user && (
        <>
          <button onClick={handleLogout}>Log out</button>
          <div>{user.username} logged in</div>
          <h2>Create New</h2>
          <BlogForm createBlog={handleCreateBlog}/>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      )}
    </div>
  )
}

export default App