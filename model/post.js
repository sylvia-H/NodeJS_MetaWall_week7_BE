const mongoose = require('mongoose');
const postSchema = new mongoose.Schema(
  {
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
        ref: 'User' 
      }
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'article_id',
  localField: '_id'
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
