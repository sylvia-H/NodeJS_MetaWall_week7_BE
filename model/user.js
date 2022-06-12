const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '請輸入您的名字'],
    },
    email: {
      type: String,
      required: [true, '請輸入您的 Email'],
      unique: true,
      select: false,
    },
    avatar: {
      type: String,
      default: 'https://i.imgur.com/K3dyy79.png',
    },
    sex: {
      type: String,
      enum: ['Male','Female'],
    },
    password: {
      type: String,
      required: [true, '請輸入您的密碼'],
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user','admin'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'users',
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
