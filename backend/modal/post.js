const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    
    userId: {
      type: String,
      required: true,
    },
    dec:{
        type:String,
        max:500
    },
    img:{
        type:String,
    },
    likes:{
        type:Array,
        default:[]
    }
    },   {timestamps:true});
  
  // Create the user model from the schema
  const Post = mongoose.model('Post', postSchema);
  
  module.exports = Post;