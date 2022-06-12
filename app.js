var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var commentsRouter = require('./routes/comments');
var uploadRouter = require('./routes/upload');

var app = express();

// MongoDB Connection
require('./helper/DB_connection');

// cors headers
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/upload', uploadRouter);

// Generate Swagger API-Doc
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerFile));

// catch 404
app.use(function(req, res, next) {
  res.status(404).json({
    status: "ERROR",
    message: "Not Found 無此路由資訊",
  });
});

// DEV phase - error handler 開發階段錯誤處理
const resErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

// PROD phase - error handler 上線階段錯誤處理
const resErrorProd = (err, res) => {
  // 自定義錯誤訊息
  if(err.isOperational){
    res.status(err.statusCode).json({
      message: err.message
    });
  } else {
    // log 錯誤紀錄
    console.error('出現重大錯誤', err);
    // 送出罐頭預設訊息
    res.status(500).json({
      status: "ERROR",
      message: "系統錯誤，請洽詢系統管理員"
    });
  }
};

// Error handler
app.use(function (err, req, res, next){
  // DEV phase
  err.statusCode = err.statusCode || 500;
  if(process.env.NODE_ENV === 'dev') {
    return resErrorDev(err, res);
  }
  // Production phase - 觸發 Mongoose 錯誤訊息
  if(err.name === 'ValidationError'){
    err.message = "資料欄位未填寫正確格式，請重新輸入！";
    err.isOperational = true;
    return resErrorProd(err, res);
  }
  // Production phase
  resErrorProd(err, res);
});

// uncaughtException - sync 同步程式出現錯誤
process.on('uncaughtException', (err) => {
  // 記錄下錯誤訊息，等到所有其他服務處理完成，停掉當前進程 process
  console.error('Uncaught Exception happens!');
  console.error(err);
  process.exit(1);
});

// unhandledRejection - async 非同步程式出現錯誤
process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled Rejection：', promise, 'Reason：', err);
});

module.exports = app;
