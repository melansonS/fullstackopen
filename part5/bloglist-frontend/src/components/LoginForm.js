import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logUserIn } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(logUserIn({ username, password }))
  }
  return (<form onSubmit={handleSubmit}>
    <h2>Login</h2>
    <div>
      Username:
      <input type="text" id="username-input" value={username} onChange={({ target }) => setUsername(target.value)}></input>
    </div>
    <div>
      Password:
      <input type="text" id="password-input" value={password} onChange={({ target }) => setPassword(target.value)}></input>
    </div>
    <button type="submit">Login</button>
  </form>)
}

export default LoginForm