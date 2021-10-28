import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
const Blog = ({ blog, username }) =>   {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const handleLike = async () => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = async () => {
    const confirmation = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if(confirmation) {
      dispatch(deleteBlog(blog))
    }
  }

  const renderDeleteButton = () => {
    if(blog.user && blog.user.username === username) {
      return <button className="delete-button" onClick={handleDelete}>Delete</button>
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
          <button onClick={handleLike} className="like-button">like</button>
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