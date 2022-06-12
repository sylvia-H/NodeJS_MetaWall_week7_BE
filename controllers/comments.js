const successHandler = require('../helper/successHandlers');
const appError = require('../helper/appError');
const Comment = require('../model/comment');

const CommentController = {
  async getComments(req, res) {
    const comments = await Comment.find().populate({
      path: 'author',
      select: '_id name avatar',
    });
    successHandler(res, comments);
  },
  async createComments(req, res) {
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
  async deleteAllComments(req, res) {
    const comments = await Comment.deleteMany({});
    successHandler(res, comments);
  },
  async deleteComments(req, res) {
    const { id } = req.params;
    await Comment.findByIdAndDelete(id)
      .then((result) => {
        if (!result) {
          return appError(400, 'Bad Request Error - Failed to get data', next);
        }
        CommentController.getComments(req, res);
      })
      .catch(() => appError(400, 'Bad Request Error - ID not found', next));
  },
  async editComments(req, res) {
    const { body } = req;
    const { id } = req.params;
    await Comment.findByIdAndUpdate(id, body)
      .then((result) => {
        if (!result) {
          return appError(400, 'Bad Request Error - Failed to get data', next);
        }
        CommentController.getComments(req, res);
      })
      .catch(() => appError(400, 'Bad Request Error - ID not found', next));
  },
};

module.exports = CommentController;
