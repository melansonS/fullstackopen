import React, { useState } from 'react'
const Blog = ({ blog, handleLike }) =>   {
  const [visible, setVisible] = useState(false)

  const likeBlog = async () => {
    handleLike(blog)
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
      </div>}
    </div>)
}

export default Blog