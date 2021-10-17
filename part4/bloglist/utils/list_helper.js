const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if(!blogs) return 0
  return blogs.reduce((total, blog) => {return blog.likes ? total + blog.likes : total}, 0)
}

module.exports = {
  dummy,
  totalLikes
}