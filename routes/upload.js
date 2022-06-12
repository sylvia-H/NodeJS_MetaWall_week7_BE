const express = require('express');
const router = express.Router();
const asyncErrorHandler = require('../helper/asyncErrorHandler');
const { isAuth, isAdmin } = require('../helper/auth');
const sizeOf = require('image-size');
const { ImgurClient } = require('imgur');

router.post(
  '/',
  isAuth,
  asyncErrorHandler(async (req, res, next) => {})
);

module.exports = router;
