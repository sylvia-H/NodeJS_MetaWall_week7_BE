const mongoose = require('mongoose');
const postSchema = new mongoose.Schema(
  {
    // _id: mongoose.ObjectId,
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, '未填寫貼文作者名'],
    },
    content: {
      type: String,
      required: [true, '未填寫貼文內容'],
    },
    tags: [
      {
        type: String,
        default: 'general',
      },
    ],
    image: {
      type: String,
      default: '',
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment',
      },
    ],
    privacy: {
      type: String,
      default: 'private',
      enum: ['public', 'club', 'private'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'posts',
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
