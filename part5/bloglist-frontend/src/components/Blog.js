import React, { useState } from 'react'
import PropTypes from 'prop-types'
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
      return <button className="delete-button" onClick={deleteBlog}>Delete</button>
    } else {
      return null
    }
  }

  return (
    <div className="blog-container">
      <div>
        {blog.title} {blog.author}
        <button className="show-blog-button" onClick={() => setVisible(!visible)}>{visible ? 'hide':'show'}</button>
      </div>
      {visible && <div>
        <p className="url">{blog.url}</p>
        <div className="likes">
          {blog.likes}
          <button onClick={likeBlog} className="like-button">like</button>
        </div>
        {renderDeleteButton()}
      </div>}
    </div>)
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

export default Blog