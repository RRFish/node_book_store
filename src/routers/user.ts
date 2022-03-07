import express from 'express';
import { insertUser, getUserByAccount, loginUser } from '../dbs/user';
import { setUserCache, delUserCache, getUserCache, loginUserCache } from '../redis/user';
import { registerVerify, loginVerify } from '../dataVerify/user';
import { BookStoreResponse } from '../utils/response';
import { passwordEncrypt } from '../utils/passwordCrypto';
import { createUserToken } from '../utils/userTokenCrypto';
import { userTokenVerifyMiddleware } from '../middleware/userToken';
import { createRandomNumber } from '../utils/createRandom';

const router = express.Router();


// 使用者註冊
router.post('/register', function (req:any, res:any, next) {
  const { nickname, account, password, passwordRe } = req.body;
  registerVerify(nickname, account, password, passwordRe);

  getUserByAccount(account)
    .then((result:any) => {
      if (result.length <= 0) { //確認此account未被使用
        const cryptoPassword:string = passwordEncrypt(password);
        return insertUser(nickname, account, cryptoPassword);
      } else {
        throw Error('該使用者已存在');
      }
    })
    .then(() => {
      res.send(new BookStoreResponse('success'));
      next();
    })
    .catch((err) => next(err));

});

// 登入
router.post('/login', function (req:any, res:any, next) {
  const { account, password } = req.body;
  loginVerify(account, password);

  const verifyCodeNew = createRandomNumber();

  loginUserCache(account, password).then((data) => {

    if (!data) return loginUser(account, password);

    return [ data ];
  }).then((result:any) => {

    if (result <= 0) {
      throw new Error('帳密錯誤');
    }

    const { id, nickname, account, password, createDate, verifyCode } = result[0];

    if (verifyCode && verifyCodeNew !== verifyCode) {
      throw new Error('重複登入');
    }

    return setUserCache(id, nickname, account, password, createDate, verifyCodeNew);
  })
    .then((account:any) => {
      res.send(new BookStoreResponse('success', { token: createUserToken(account, verifyCodeNew) }));
      next();
    })
    .catch((err:any) => {
      delUserCache(account).then(() => {
        next(err);
      });
    });
});

// 取得使用者資訊
router.post('/userInfo', userTokenVerifyMiddleware, function (req:any, res:any, next) {
  const { account } = req.user;
  let result = {};
  const verifyCodeNew = createRandomNumber();
  //增加取得userInfo次數
  getUserCache(account).then((data:any) => {
    const { id, account } = data;
    if (id) {
      return [ data ];
    }
    return getUserByAccount(account);
  }).then((data:any) => {
    const { id, nickname, account, password, createDate } = data[0];
    data[0].verifyCode = verifyCodeNew;
    result = data[0];
    return setUserCache(id, nickname, account, password, createDate, verifyCodeNew);
  }).then(() => {
    const user = result;
    res.send(new BookStoreResponse('success', { ...user, token: createUserToken(account, verifyCodeNew) }));
    next();
  });
});

// 登出
router.post('/logout', userTokenVerifyMiddleware, function (req:any, res:any, next:any) {
  const user = req.user;
  delUserCache(user.account).then(() => {
    res.send(new BookStoreResponse('success'));
    next();
  });
});

export default router;