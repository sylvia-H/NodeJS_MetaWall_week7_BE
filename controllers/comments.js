const successHandler = require('../helper/successHandlers');
const appError = require('../helper/appError');
const Comment = require('../model/comment');

const CommentController = {
  async getComments(req, res, next) {
    const { articleID } = req.params;
    const comments = await Comment.find({ articleID }).populate({
      path: 'author',
      select: '_id name avatar',
    });
    successHandler(res, comments);
  },
  async createComments(req, res, next) {
    const { articleID, author, comment } = req.body;
    if (articleID && author && comment) {
      await Comment.create({
        articleID,
        author,
        comment,
      });
      CommentController.getComments(req, res);
    } else {
      return appError(
        400,
        'Bad Request Error - All required fields must be completed.',
        next
      );
    }
  },
  async deleteComments(req, res, next) {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    // 非本人不能刪除評論
    if (req.user._id !== comment.author._id) {
      return appError(
        401,
        'Bad Request Error - You do not have permission to delete this comment',
        next
      );
    }
    await Comment.findByIdAndDelete(id)
      .then((result) => {
        if (!result) {
          return appError(400, 'Bad Request Error - Failed to get data', next);
        }
        CommentController.getComments(req, res);
      })
      .catch(() => appError(400, 'Bad Request Error - ID not found', next));

    // await Comment.findById(id)
    //   .then((result) => {
    //     if (!result) {
    //       return appError(400, 'Bad Request Error - Failed to get data', next);
    //     }
    //     // 非本人不能刪除評論
    //     if(req.user._id !== result.author._id) {
    //       return appError(401, 'Bad Request Error - You do not have permission to delete this comment', next);
    //     }
    //     await Comment.findByIdAndDelete(id)
    //     .then(()=>{
    //       CommentController.getComments(req, res);
    //     })
    //     .catch(() => appError(400, 'Bad Request Error - ID not found', next));
    //   })
    //   .catch(() => appError(400, 'Bad Request Error - ID not found', next));
  },
  async editComments(req, res, next) {
    const { body } = req;
    const { id } = req.params;
    const comment = await Comment.findById(id);
    // 非本人不能修改評論
    if (req.user._id !== comment.author._id) {
      return appError(
        401,
        'Bad Request Error - You do not have permission to delete this comment',
        next
      );
    }
    await Comment.findByIdAndUpdate(id, body)
      .then((result) => {
        if (!result) {
          return appError(400, 'Bad Request Error - Failed to get data', next);
        }
        CommentController.getComments(req, res);
      })
      .catch(() => appError(400, 'Bad Request Error - ID not found', next));
  },
  async deleteAllComments(req, res, next) {
    const comments = await Comment.deleteMany({});
    successHandler(res, comments);
  },
};

module.exports = CommentController;
