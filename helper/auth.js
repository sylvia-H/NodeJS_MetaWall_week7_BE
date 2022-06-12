const express = require('express');
const asyncErrorHandler = require('../helper/asyncErrorHandler');
const appError = require('../helper/appError');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const isAuth = asyncErrorHandler(async (req, res, next) => {
  // 驗證 token 是否存在
  let token;
  const AUTH = req.headers.authorization;
  if (AUTH && AUTH.startsWith('Bearer')) {
    token = AUTH.split(' ')[1];
  }

  if (!token) {
    return appError(
      401,
      'Unauthorized Error - lacks valid authentication credentials',
      next
    );
  }

  // 驗證 token 正確性
  const decode = await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });

  // 將 user 資料夾帶進 req
  const currentUser = await User.findById(decode.id);
  req.user = currentUser;

  next();
});

const isAdmin = asyncErrorHandler(async (req, res, next) => {
  // 驗證 header 是否夾帶 X-API-KEY 資訊
  const AUTH = req.headers['x-api-key'];
  if (!AUTH && AUTH !== 'MetaWall_admin') {
    return appError(
      401,
      'Unauthorized Error - Permission denied.',
      next
    );
  }
  // 驗證是否具有管理者權限
  if (req.user.role === 'admin') {
    next();
  } else {
    return appError(
      401,
      'Unauthorized Error - Permission denied. Only system administrators have access privileges.',
      next
    );
  }
});

const generateJWTToken = (user, statusCode, res) => {
  // 產生 JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_DAY }
  );
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    user: {
      token,
      name: user.name,
      role: user.role,
    },
  });
};

module.exports = { isAuth, isAdmin, generateJWTToken };
