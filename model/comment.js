const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema(
  {
    articleID: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, '沒有貼文 ID'],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, '缺少回文者資訊'],
    },
    body: {
      type: String,
      required: [true, '沒有回覆內容'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'comments',
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
