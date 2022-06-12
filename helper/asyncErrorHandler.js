// Async/Promise 非同步函式錯誤處理
const asyncErrorHandler = (func) => {
  // 將 async function 帶入參數 func 儲存起來
  // 返回 express 規定的函式格式
  return function (req, res, next) {
    // 執行 func 函式，錯誤已可用 catch 捕捉
    func(req, res, next).catch(
      (err) => {
        return next(err);
      }
    );
  }
};

module.exports = asyncErrorHandler;
