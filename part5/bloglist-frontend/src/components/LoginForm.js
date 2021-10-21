import React, { useState } from 'react'
import   loginService  from '../services/login'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await loginService.login({ username, password })
      handleLogin(response)
      setUsername('')
      setPassword('')
    } catch (err) {
      console.error(err.message)
    }
  }
  return (<form onSubmit={handleSubmit}>
    <h2>Login</h2>
    <div>
      Username:
      <input type="text" value={username} onChange={({ target }) => setUsername(target.value)}></input>
    </div>
    <div>
      Password:
      <input type="text" value={password} onChange={({ target }) => setPassword(target.value)}></input>
    </div>
    <button type="submit">Login</button>
  </form>)
}

export default LoginForm