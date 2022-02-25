const { userDB } = require('../utils/redis.js');
const { REDIS_USER_EXPIRE_TIME } = require('../config.js');

function setUserCacheExpire (id) {
  return new Promise((resolve, reject) => {
    userDB.expire(id, REDIS_USER_EXPIRE_TIME).then(() => {
      return resolve();
    }).catch((err) => reject(err));

  });
}

function getUserCacheTTL (id) {
  return new Promise((resolve, reject) => {
    userDB.ttl(id).then((data) => {
      return resolve(data);
    }).catch((err) => reject(err));

  });
}

function getUserCache (id) {
  return new Promise((resolve, reject) => {
    userDB.get(id).then((data) => {
      if (!data) return resolve(null);
      const jsonData = JSON.parse(data);

      return resolve(jsonData);
    }).catch((err) => reject(err));
  });
}

function getUserCacheAndExpireExtend (id) {
  return new Promise((resolve, reject) => {
    userDB.multi().get(id).expire(id, REDIS_USER_EXPIRE_TIME).exec().then((data) => {
      const userData = data[0][1];
      const parseUserData = JSON.parse(userData);
      resolve(parseUserData);
    }).catch((err) => reject(err));

  });
}

function setUserCache (id, nickname, account, password, createDate, loginCount) {
  return new Promise((resolve, reject) => {
    const saveData = { id, nickname, account, password, createDate, loginCount };
    userDB.set(id, JSON.stringify(saveData), 'ex', REDIS_USER_EXPIRE_TIME).then(() => {
      return resolve(id);
    }).catch((err) => reject(err));
  });
}

function delUserCache (id) {
  return new Promise((resolve, reject) => {
    userDB.del(id).then((data) => {
      if (!data) return resolve(null);
      const jsonData = JSON.parse(data);
      return resolve(jsonData);

    }).catch((err) => reject(err));
  });
}

function updateUserCache (id, nickname, account, password, createDate) {
  return new Promise((resolve, reject) => {
    getUserCache(id).then((user) => {
      //先取得cache的值 沒有則不更新
      if (!user) return resolve();
      if (nickname) user.nickname = nickname;
      if (account) user.account = account;
      if (password) user.password = password;
      if (createDate) user.createDate = createDate;
      userDB.set(id, JSON.stringify(user)).then(() => {
        return resolve();
      }).catch((err) => reject(err));
    });

  });
}



module.exports = {
  getUserCache,
  setUserCache,
  delUserCache,
  updateUserCache,
  setUserCacheExpire,
  getUserCacheTTL,
  getUserCacheAndExpireExtend
};
