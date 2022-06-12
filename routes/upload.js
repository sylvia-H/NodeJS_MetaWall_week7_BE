const express = require('express');
const router = express.Router();
const asyncErrorHandler = require('../helper/asyncErrorHandler');
const { isAuth, isAdmin } = require('../helper/auth');
const { upload, apiLimiter } = require('../helper/uploadImage');
const UploadController = require('../controllers/upload');

router.post(
  '/',
  isAuth,
  apiLimiter,
  upload,
  asyncErrorHandler(UploadController.uploadImg)
);

module.exports = router;
