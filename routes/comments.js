const express = require('express');
const router = express.Router();
const asyncErrorHandler = require('../helper/asyncErrorHandler');
const { isAuth, isAdmin } = require('../helper/auth');
const CommentController = require('../controllers/comments');

router.get(
  '/:article_id',
  /**
   * #swagger.tags = ['Comments - 貼文評論']
   * #swagger.description = '取得某篇貼文的評論資訊 API'
   */
  isAuth,
  asyncErrorHandler(CommentController.getComments)
);

router.post(
  '/',
  /**
   * #swagger.tags = ['Comments - 貼文評論']
   * #swagger.description = '新增單筆貼文評論資訊 API'
   */
  isAuth,
  asyncErrorHandler(CommentController.createComments)
);

router.delete(
  '/:id',
  /**
   * #swagger.tags = ['Comments - 貼文評論']
   * #swagger.description = '刪除單筆由自己張貼的評論資訊 API'
   */
  isAuth,
  asyncErrorHandler(CommentController.deleteComments)
);

router.patch(
  '/:id',
  /**
   * #swagger.tags = ['Comments - 貼文評論']
   * #swagger.description = '修改單筆由自己張貼的評論資訊 API'
   */
  isAuth,
  asyncErrorHandler(CommentController.editComments)
);

router.delete(
  '/',
  /**
   * #swagger.tags = ['後台：Comments - 貼文評論']
   * #swagger.description = '刪除所有貼文評論資訊 API'
   * #swagger.security = [{ "api_key": [] }]
   */
  isAuth,
  isAdmin,
  asyncErrorHandler(CommentController.deleteAllComments)
);

module.exports = router;
