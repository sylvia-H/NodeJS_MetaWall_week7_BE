const express = require('express');
const router = express.Router();
const asyncErrorHandler = require('../helper/asyncErrorHandler');
const { isAuth, isAdmin } = require('../helper/auth');
const { upload, apiLimiter } = require('../helper/uploadImage');
const UploadController = require('../controllers/upload');

router.post(
  '/',
  /**
    * #swagger.tags = ['Other - 上傳圖片']
    * #swagger.description = '上傳圖片到 imgUr 圖床 API'
    * #swagger.parameters['body'] = {
        in: "body",
        required: true,
        description: "form-data 資料格式"
      }
  */
  isAuth,
  apiLimiter,
  upload,
  asyncErrorHandler(UploadController.uploadImg)
);

module.exports = router;
