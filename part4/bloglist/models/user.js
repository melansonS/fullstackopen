const mongoose = require('mongoose')
const uniqueValiator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type:String,
    unique: true,
    required: true,
    minlength: 3
  },
  name: {
    type:String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
})

userSchema.set('toJSON', {
  transform: (object, returnedObject) => {
    returnedObject.id = object._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValiator)

module.exports = new mongoose.model('User', userSchema)