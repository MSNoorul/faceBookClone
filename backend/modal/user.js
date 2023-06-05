const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      min:3,
      max:20,
      unique: true
    },
    email: {
      type: String,
      required: true,
      max:20,
      unique: true
    },
    profilePicture:{
        type:String,
        default:"",
    },
    coverPicture:{
        type:String,
        default:"",
    },
    refreshtoken:{
        type:String,
        default:"",
    },
    password: {
      type: String,
      required: true
    },
    salt:{
      type:String,
      required:true
    },
    followers:{
        type:Array,
        default:[],
    },
    following:{
        type:Array,
        default:[],
    },
    city:{
      type:String,
      default:"mycity"
    },
    phone:{
      type:Number,
      default:0000
    },
    Status:{
      type:String,
      default:"Married Or Single"
    }
  });
  
  // Create the user model from the schema
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;