const express = require('express');
const router = express.Router();
const { insertUser, getUserByAccount, loginUser } = require('../dbs/user.js');
const { setUserCache, delUserCache, getUserCache } = require('../redis/user.js');
const { registerVerify, loginVerify } = require('../dataVerify/user.js');
const { BookStoreResponse } = require('../utils/response');
const { passwordEncrypt } = require('../utils/passwordCrypto.js');
const { createUserToken } = require('../utils/userTokenCrypto.js');
const { userTokenVerifyMiddleware } = require('../middleware/userToken.js');


// 使用者註冊
router.post('/register', function (req, res, next) {
  const { nickname, account, password, passwordRe } = req.body;
  registerVerify(nickname, account, password, passwordRe);

  getUserByAccount(account)
    .then((result) => {
      if (result.length <= 0) { //確認此account未被使用
        const cryptoPassword = passwordEncrypt(password);
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
router.post('/login', function (req, res, next) {
  const { account, password } = req.body;
  loginVerify(account, password);
  loginUser(account, password)
    .then((result) => {
      if (result <= 0) {
        next(new Error('帳密錯誤'));
      } else {
        const { id, nickname, account, password, createDate } = result[0];
        return setUserCache(id, nickname, account, password, createDate, 0);
      }
    })
    .then((id) => {
      res.send(new BookStoreResponse('success', { token: createUserToken(id) }));
      next();
    })
    .catch((err) => next(err));
});

// 取得使用者資訊
router.post('/userInfo', userTokenVerifyMiddleware, function (req, res, next) {
  const { id } = req.user;
  let result = {};
  //增加取得userInfo次數
  getUserCache(id).then((data) => {
    const { id, account } = data;
    if (id) {
      return [ data ];
    }
    return getUserByAccount(account);
  }).then((data) => {
    const { id, nickname, account, password, createDate, loginCount } = data[0];
    result = data[0];
    return setUserCache(id, nickname, account, password, createDate, loginCount + 1);
  }).then(() => {
    const user = result;
    console.log('userinfo', result);
    res.send(new BookStoreResponse('success', user));
    next();
  });
});

// 測試
router.post('/test', userTokenVerifyMiddleware, function (req, res, next) {
  const user = req.user;
  console.log('user', user);
  res.send(new BookStoreResponse('test'));
  next();
});

// 登出
router.post('/logout', userTokenVerifyMiddleware, function (req, res, next) {
  const user = req.user;
  delUserCache(user.id).then(() => {
    res.send(new BookStoreResponse('success'));
    next();
  });
});


module.exports = router;