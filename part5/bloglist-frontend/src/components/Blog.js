import React, { useState } from 'react'
const Blog = ({ blog, handleLike, handleDelete, username }) =>   {
  const [visible, setVisible] = useState(false)

  const likeBlog = async () => {
    handleLike(blog)
  }

  const deleteBlog = async () => {
    const confirmation = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if(confirmation) {
      handleDelete(blog)
    }
  }

  const renderDeleteButton = () => {
    if(blog.user && blog.user.username === username) {
      return <button onClick={deleteBlog}>Delete</button>
    } else {
      return null
    }
  }

  return (
    <div className="blog-container">
      <div>
        {blog.title}
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide':'show'}</button>
      </div>
      {visible && <div>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <div>
          {blog.likes}
          <button onClick={likeBlog}>like</button>
        </div>
        {renderDeleteButton()}
      </div>}
    </div>)
}

export default Blog