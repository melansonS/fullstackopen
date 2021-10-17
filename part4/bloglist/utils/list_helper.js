const dummy = (blogs) => {
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}