const express = require('express');
const router = express.Router();
const asyncErrorHandler = require('../helper/asyncErrorHandler');
const { isAuth, isAdmin } = require('../helper/auth');
const UserController = require('../controllers/users');

// 前台：User - 使用者
router.post(
  '/sign_up',
  /**
   * #swagger.tags = ['User - 使用者']
   * #swagger.description = '使用者註冊 API'
   * #swagger.parameters['body'] = {
        in: "body",
        type: "object",
        required: true,
        description: "資料格式",
        schema: { $ref: "#/definitions/sign_up_Schema" }
      }
   * #swagger.responses[200] = {
          description: '使用者註冊成功',
          schema: { $ref: "#/definitions/getToken_Schema" }
        }
      }
   */
  asyncErrorHandler(UserController.signUp)
);

router.post(
  '/sign_in',
  /**
   * #swagger.tags = ['User - 使用者']
   * #swagger.description = '使用者登入 API'
   * #swagger.parameters['body'] = {
        in: "body",
        type: "object",
        required: true,
        description: "資料格式",
        schema: { $ref: "#/definitions/sign_in_Schema" }
      }
   * #swagger.responses[200] = {
          description: '使用者登入成功',
          schema: { $ref: "#/definitions/getToken_Schema" }
        }
      }
   */
  asyncErrorHandler(UserController.signIn)
);

router.post(
  '/updatePassword',
  /**
   * #swagger.tags = ['User - 使用者']
   * #swagger.description = '使用者修改密碼 API'
   * #swagger.parameters['body'] = {
        in: "body",
        type: "object",
        required: true,
        description: "資料格式",
        schema: { $ref: "#/definitions/updatePassword_Schema" }
      }
   * #swagger.responses[200] = {
          description: '使用者修改密碼成功',
          schema: { $ref: "#/definitions/getToken_Schema" }
        }
      }
   */
  isAuth,
  asyncErrorHandler(UserController.updatePassword)
);

router.get(
  '/profile',
  /**
   * #swagger.tags = ['User - 使用者']
   * #swagger.description = '使用者取得個人資料 API'
   * #swagger.responses[200] = {
          description: '使用者成功取得個人資料',
          schema: { $ref: "#/definitions/getProfile_Schema" }
        }
      }
   */
  isAuth,
  asyncErrorHandler(UserController.getProfile)
);

router.patch(
  '/profile',
  /**
   * #swagger.tags = ['User - 使用者']
   * #swagger.description = '使用者修改個人資料 API'
   * #swagger.parameters['body'] = {
        in: "body",
        type: "object",
        required: true,
        description: "資料格式",
        schema: { $ref: "#/definitions/updateProfile_Schema" }
      }
   * #swagger.responses[200] = {
          description: '使用者成功修改個人資料：暱稱/性別/大頭照',
          schema: { $ref: "#/definitions/getProfile_Schema" }
        }
      }
   */
  isAuth,
  asyncErrorHandler(UserController.editProfile)
);

// 後台：Users - 用戶
router.get(
  '/',
  /**
   * #swagger.tags = ['後台：Users - 用戶']
   * #swagger.description = '取得所有用戶資訊 API'
   * #swagger.security = [{ "api_key": [] }]
   * #swagger.responses[200] = {
          description: '管理者成功取得所有使用者資料',
          schema: { $ref: "#/definitions/getAllUsers_Schema" }
        }
      }
   */
  isAuth,
  isAdmin,
  asyncErrorHandler(UserController.getUsers)
);

router.get(
  '/:id',
  /**
   * #swagger.tags = ['後台：Users - 用戶']
   * #swagger.description = '取得單一用戶資訊 API'
   * #swagger.security = [{ "api_key": [] }]
   * #swagger.responses[200] = {
          description: '管理者成功取得單一使用者資料',
          schema: { $ref: "#/definitions/getUser_Schema" }
        }
      }
   */
  isAuth,
  isAdmin,
  asyncErrorHandler(UserController.getUsers)
);

router.delete(
  '/',
  /**
   * #swagger.tags = ['後台：Users - 用戶']
   * #swagger.description = '刪除所有用戶資訊 API'
   * #swagger.security = [{ "api_key": [] }]
   */
  isAuth,
  isAdmin,
  asyncErrorHandler(UserController.deleteAllUsers)
);

router.delete(
  '/:id',
  /**
   * #swagger.tags = ['後台：Users - 用戶']
   * #swagger.description = '刪除單一用戶資訊 API'
   * #swagger.security = [{ "api_key": [] }]
   */
  isAuth,
  isAdmin,
  asyncErrorHandler(UserController.deleteUsers)
);

router.patch(
  '/:id',
  /**
   * #swagger.tags = ['後台：Users - 用戶']
   * #swagger.description = '修改單一用戶資訊 API'
   * #swagger.security = [{ "api_key": [] }]
   */
  isAuth,
  isAdmin,
  asyncErrorHandler(UserController.editUsers)
);

module.exports = router;
