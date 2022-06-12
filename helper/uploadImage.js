const multer = require('multer');
const path = require('path');
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const upload = multer({
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    // 限制上傳格式
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
      cb(new Error('檔案格式錯誤，僅限上傳 jpg、jpeg 與 png 格式。'));
    }
    cb(null, true);
  },
}).any();

// upload errorHandler
// Middleware：過濾檔案格式與圖片大小
upload(req, res, function (err) {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading.
    return appError(400, err, next);
  } else if (err) {
    // An unknown error occurred when uploading.
    return appError(400, 'Bad Request Error - File upload failed.', next);
  }
  // Everything went fine.
  next();
});

module.exports = { apiLimiter, upload };
