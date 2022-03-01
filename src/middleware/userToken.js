const { userTokenVerify } = require('../utils/userTokenCrypto');
const { getUserCacheAndExpireExtend, delUserCache } = require('../redis/user.js');
const { BookStoreResponse } = require('../utils/response');

function userTokenVerifyMiddleware (req, res, next) {
  const token = req.headers.token;
  const userId = userTokenVerify(token);
  getUserCacheAndExpireExtend(userId).then((data) => {

    if (!data) throw new Error('token過期請重新登入');

    if (data.loginCount > 1) { //判斷是否重複登入
      delUserCache(data.id);
      throw new Error('重複登入');
    }

    req.user = data;
    next();
  }).catch((err) => {
    res.send(new BookStoreResponse(err.message, null, 400));
    return err;
  });
}

module.exports = {
  userTokenVerifyMiddleware
};
