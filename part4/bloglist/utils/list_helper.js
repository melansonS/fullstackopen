const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  if(!blogs) return 0
  return blogs.reduce((total, blog) => {return blog.likes ? total + blog.likes : total}, 0)
}

const favoriteBlog = (blogs) => {
  if(!blogs) return
  return blogs.reduce((prev, current) => {
    if(prev.likes > current.likes) {
      return prev
    } else {
      return {
        title: current.title,
        author: current.author,
        likes: current.likes
      }
    }
  }, { likes: 0 })
}

const mostBlogs = (blogs) => {
  if(!blogs) return
  let authorWithMostBlogs = ''
  let highestBlogCount = 0
  const authors = {}
  blogs.forEach(blog => {
    if(authors[blog.author] !== undefined) {
      authors[blog.author] ++
    } else {
      authors[blog.author] = 1
    }
    if(authors[blog.author] > highestBlogCount) {
      highestBlogCount = authors[blog.author]
      authorWithMostBlogs = blog.author
    }
  })
  return { author: authorWithMostBlogs, blogs: highestBlogCount }
}

const mostLikes = (blogs) => {
  if(!blogs) return
  let authorWithMostLikes = ''
  let highestLikes = 0
  const authors = {}
  blogs.forEach(blog => {
    if(authors[blog.author] !== undefined) {
      authors[blog.author] += blog.likes
    } else {
      authors[blog.author] = blog.likes
    }
    if(authors[blog.author] > highestLikes) {
      highestLikes = authors[blog.author]
      authorWithMostLikes = blog.author
    }
  })
  return { author: authorWithMostLikes, likes: highestLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}