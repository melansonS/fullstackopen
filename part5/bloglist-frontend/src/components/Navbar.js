import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logUserOut } from '../reducers/userReducer'

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(logUserOut())
  }
  return (<div className="navbar">
    <span><Link to="/blogs">blogs</Link></span>
    <span><Link to="/users">users</Link></span>
    <span>{user.username} logged in</span>
    <button id="logout-button" onClick={handleLogout}>Log out</button>
  </div>)
}

export default Navbar