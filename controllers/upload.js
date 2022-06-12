const appError = require('../helper/appError');
const sizeOf = require('image-size');
const { ImgurClient } = require('imgur');

const UploadController = {
  async uploadImg(req, res, next) {
    // 門檻一：過濾檔案上傳失敗狀況
    if (!req.files.length) {
      return appError(400, 'Bad Request Error - File upload failed.', next);
    }
    // 門檻二：過濾檔案尺寸過大
    const dimensions = sizeOf(req.files[0].buffer);
    console.log(dimensions.width, dimensions.height);
    if (dimensions.width > 2000 || dimensions.height > 2000) {
      return next(appError(400, '圖片長寬尺寸過大，請重新上傳', next));
    }
    // 上傳 imgUr 圖床
    const client = new ImgurClient({
      clientId: process.env.IMGUR_CLIENTID,
      clientSecret: process.env.IMGUR_CLIENT_SECRET,
      refreshToken: process.env.IMGUR_REFRESH_TOKEN,
    });
    const response = await client.upload({
      image: req.files[0].buffer.toString('base64'),
      type: 'base64',
      album: process.env.IMGUR_ALBUM_ID,
    });
    // 回傳 imgUr 回傳的 link
    res.status(200).json({
      status: 'success',
      imgUrl: response.data.link,
    });
  },
};

module.exports = UploadController;
