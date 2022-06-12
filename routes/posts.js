const express = require('express');
const router = express.Router();
const asyncErrorHandler = require('../helper/asyncErrorHandler');
const { isAuth, isAdmin } = require('../helper/auth');
const PostController = require('../controllers/posts');

router.get(
  '/',
  /**
    * #swagger.tags = ['Posts - 貼文']
    * #swagger.description = '取得所有貼文 API'
    * #swagger.responses[200] = {
        description: '成功取得所有貼文內容',
        schema: { $ref: "#/definitions/getPosts_Schema" }
      }
    }
    */
  isAuth,
  asyncErrorHandler(PostController.getPosts)
);

router.get(
  '/:id',
  /**
    * #swagger.tags = ['Posts - 貼文']
    * #swagger.description = '取得個人貼文列表 API'
  */
  isAuth,
  asyncErrorHandler(PostController.getMyPosts)
);

router.post(
  '/',
  /**
    * #swagger.tags = ['Posts - 貼文']
    * #swagger.description = '新增貼文 API'
    * #swagger.parameters['body'] = {
        in: "body",
        type: "object",
        required: true,
        description: "資料格式",
        schema: { $ref: "#/definitions/createdPosts_Schema" }
      }
    * #swagger.responses[200] = {
        description: '成功新增一篇貼文',
        schema: { $ref: "#/definitions/getPosts_Schema" }
      }
    }
  */
  isAuth,
  asyncErrorHandler(PostController.createPosts)
);

router.delete(
  '/',
  /**
   * #swagger.tags = ['後台：Posts - 貼文']
   * #swagger.description = '刪除所有貼文 API'
   * #swagger.security = [{ "api_key": [] }]
   */
  isAuth,
  isAdmin,
  asyncErrorHandler(PostController.deleteAllPosts)
);

router.delete(
  '/:id',
  /**
   * #swagger.tags = ['Posts - 貼文']
   * #swagger.description = '刪除單一貼文 API'
   */
  isAuth,
  asyncErrorHandler(PostController.deletePosts)
);

router.patch(
  '/:id',
  /**
   * #swagger.tags = ['Posts - 貼文']
   * #swagger.description = '修改單一貼文 API'
    * #swagger.parameters['body'] = {
        in: "body",
        type: "object",
        required: true,
        description: "資料格式",
        schema: { $ref: "#/definitions/editPost_Schema" }
      }
   */
  isAuth,
  asyncErrorHandler(PostController.editPosts)
);

router.post(
  '/:id/like',
  /**
    * #swagger.tags = ['Posts - 貼文']
    * #swagger.description = '貼文按讚 API'
  */
  isAuth,
  asyncErrorHandler(PostController.like)
);

router.delete(
  '/:id/like',
  /**
    * #swagger.tags = ['Posts - 貼文']
    * #swagger.description = '貼文收回讚 API'
  */
  isAuth,
  asyncErrorHandler(PostController.unlike)
);

router.get(
  '/user/:id',
  /**
    * #swagger.tags = ['Posts - 貼文']
    * #swagger.description = '取得個人按讚列表 API'
  */
  isAuth,
  asyncErrorHandler(PostController.getFavList)
);

module.exports = router;
