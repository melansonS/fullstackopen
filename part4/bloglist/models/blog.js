const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: { type:String, required:true },
  author: { type:String, required:true },
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (object, returnedObject) => {
    returnedObject.id = object._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = new mongoose.model('Blog',blogSchema)
