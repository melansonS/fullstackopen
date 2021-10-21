import React, { useState } from 'react'
import   loginService  from '../services/login'

const LoginForm = ({ handleUpdateUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await loginService.login({ username, password })
      handleUpdateUser(response)
      setUsername('')
      setPassword('')
    } catch (err) {
      console.log(err.name)
      console.error(err.message)
    }
  }
  return (<form onSubmit={handleLogin}>
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