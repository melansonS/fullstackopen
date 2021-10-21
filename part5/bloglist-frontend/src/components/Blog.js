import React, { useState } from 'react'
const Blog = ({ blog }) =>   {
  const [visible, setVisible] = useState(false)

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
          <button>like</button>
        </div>
      </div>}
    </div>)
}

export default Blog