import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender:{
    type: String,
    required: true,
  },
  semester:{
    type:Number,
    required:true,
  },
  branch:{
    type: String,
    required: true,
  },
  rollNo:{
    type: String,
    required: true,
  },
  course:{
    type: String,
    required: true,
  },
  profilePic:{
    type: String,
    required: false,
  },
  accessToken: {
    type: String,
    required: false,
  },
    refreshToken: {
        type: String,
        required: false,
    },
    contactNo:{
        type: Number,
        required: true,
    },
    
  });

  userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  });
  
  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  userSchema.methods.generateAccessToken = function () {
    return jwt.sign({ id: this._id, username: this.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  };
  
  userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ id: this._id,username: this.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  };


  export const User = mongoose.model('User', userSchema);