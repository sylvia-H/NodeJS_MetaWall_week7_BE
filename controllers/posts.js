const successHandler = require('../helper/successHandlers');
const appError = require('../helper/appError');
const Post = require('../model/post');

const PostController = {
  async getPosts(req, res) {
    // 過濾出自己的貼文，以及設為公開的貼文
    const permission = {
      $or: [{ author: { _id: req.user._id } }, { privacy: 'public' }],
    };
    // 貼文時間序列
    const timeSort = req.query.timeSort === 'asc' ? 'createdAt' : '-createdAt';
    // 搜尋貼文內容
    const q =
      req.query.q !== undefined ? { content: new RegExp(req.query.q) } : {};
    const posts = await Post.find(permission)
      .find(q)
      .populate({
        path: 'author',
        select: 'name avatar',
      })
      .populate({
        path: 'comments',
      })
      .sort(timeSort);
    successHandler(res, posts);
  },
  async createPosts(req, res) {
    // 只能 post 自己的貼文
    if (!req.user) {
      return appError(401, 'Bad Request Error - Please login again.', next);
    }
    // 貼文內容不可為空
    if (req.body.content) {
      await Post.create({
        author: req.user._id,
        content: req.body.content,
        tags: req.body.tags || 'general',
        image: req.body.image || '',
        privacy: req.body.privacy || 'private',
      });
      PostController.getPosts(req, res);
    } else {
      return appError(
        400,
        'Bad Request Error - All required fields must be completed.',
        next
      );
    }
  },
  async deleteAllPosts(req, res) {
    const posts = await Post.deleteMany({});
    successHandler(res, posts);
  },
  async deletePosts(req, res) {
    const { id } = req.params;
    await Post.findByIdAndDelete(id)
      .then((result) => {
        if (!result) {
          return appError(400, 'Bad Request Error - Failed to get data', next);
        }
        PostController.getPosts(req, res);
      })
      .catch(() => appError(400, 'Bad Request Error - ID not found', next));
  },
  async editPosts(req, res) {
    const { body } = req;
    const { id } = req.params;
    if (!body.content) {
      return appError(
        400,
        'Bad Request Error - The post content cannot be blank.',
        next
      );
    }
    await Post.findByIdAndUpdate(id, body)
      .then((result) => {
        if (!result) {
          return appError(400, 'Bad Request Error - Failed to get data', next);
        }
        PostController.getPosts(req, res);
      })
      .catch(() => appError(400, 'Bad Request Error - ID not found', next));
  },
  async like(req, res) {
    const id = req.params.id;
    await Post.findOneAndUpdate(
      { id },
      { $addToSet: { likes: req.user._id } },
      { new: true },
      (err, result) => {
        if (err) {
          return appError(
            400,
            'Bad Request Error - Something wrong when updating data!',
            next
          );
        }
        res.status(201).json({
          status: 'success',
          postId: id,
          userId: req.user.id,
        });
      }
    );
  },
  async unlike(req, res) {
    const id = req.params.id;
    await Post.findOneAndUpdate(
      { id },
      { $pull: { likes: req.user._id } },
      { new: true },
      (err, result) => {
        if (err) {
          return appError(
            400,
            'Bad Request Error - Something wrong when updating data!',
            next
          );
        }
        res.status(201).json({
          status: 'success',
          postId: id,
          userId: req.user.id,
        });
      }
    );
  },
  async getFavList(req, res) {
    const user = req.params.id;
    const favList = await Post.find({ user });
    successHandler(res, favList);
  },
};

module.exports = PostController;
