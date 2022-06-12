const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema(
  {
    article_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, '沒有貼文 ID'],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, '缺少回文者資訊'],
    },
    comment: {
      type: String,
      required: [true, '回覆內容不可為空！'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'comments',
  }
);

commentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'author',
    select: '_id name avatar'
  });

  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
