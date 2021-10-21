import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()

  const handleLogin = (user) => {
    setUser(user)
    window.localStorage.setItem('user', JSON.stringify(user))
  }

  const handleLogout = () => {
    setUser(undefined)
    window.localStorage.removeItem('user')
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if(user) {
      setUser(JSON.parse(user))
    }
  }, [])

  return (
    <div>
      <LoginForm handleLogin={handleLogin}/>
      {user && (
        <>
          <button onClick={handleLogout}>Log out</button>
          <div>{user.username} logged in</div>
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