import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const User = () => {
  const params = useParams()
  const user = useSelector(state => state.users.find(user => user.id === params.id))

  return (
    <div>
      {user ? (
        <>
          <h2>{user.name}</h2>
          <h4>Added blogs</h4>
          <ul>
            {user.blogs.map(blog => (<li key={blog.id}>{blog.title}</li>))}
          </ul>
        </>
      ) : (<div>User not found...</div>)}
    </div>
  )
}

export default User