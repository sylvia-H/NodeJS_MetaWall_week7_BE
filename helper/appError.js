// 自定義可預期錯誤
const appError = (httpStatus, errMsg, next) => {
  const error = new Error(errMsg);
  error.statusCode = httpStatus;
  error.isOperational = true;
  next(error);
}

module.exports = appError;
