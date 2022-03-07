import { userTokenVerify } from '../utils/userTokenCrypto';
import { getUserCacheAndExpireExtend, delUserCache } from '../redis/user';
import { BookStoreResponse } from '../utils/response';

function userTokenVerifyMiddleware (req:any, res:any, next:any) {
  const token:string = req.headers.token;
  const { account, verifyCode } = userTokenVerify(token);
  getUserCacheAndExpireExtend(account).then((data:any) => {

    if (!data) throw new Error('token過期請重新登入');

    if (data.verifyCode != verifyCode) { //判斷是否重複登入
      delUserCache(data.account);
      throw new Error('重複登入');
    }

    req.user = data;
    next();
  }).catch((err) => {
    res.send(new BookStoreResponse(err.message, null, 400));
    return err;
  });
}

export {
  userTokenVerifyMiddleware
};
