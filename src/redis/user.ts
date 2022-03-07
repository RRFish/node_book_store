import { userDB } from '../utils/redis';
import { REDIS_USER_EXPIRE_TIME } from '../config';
import { json } from 'body-parser';

function getUserCache (account:string) {
  return new Promise((resolve, reject) => {
    userDB.get(account).then((data:any) => {
      if (!data) return resolve(null);
      const jsonData = JSON.parse(data);

      return resolve(jsonData);
    }).catch((err:Error) => reject(err));
  });
}

function getUserCacheAndExpireExtend (account:string) {
  return new Promise((resolve, reject) => {
    userDB.multi().get(account).expire(account, REDIS_USER_EXPIRE_TIME).exec().then((data:any) => {
      const userData:string = data[0][1];
      const parseUserData:object = JSON.parse(userData);
      resolve(parseUserData);
    }).catch((err:Error) => reject(err));

  });
}

function setUserCache (id:number, nickname:string, account:string, password:string, createDate:string, verifyCode:number) {
  return new Promise((resolve, reject) => {
    const saveData = { id, nickname, account, password, createDate, verifyCode };
    userDB.set(account, JSON.stringify(saveData), 'ex', REDIS_USER_EXPIRE_TIME).then(() => {
      return resolve(account);
    }).catch((err:Error) => reject(err));
  });
}

function delUserCache (account:string) {
  return new Promise((resolve, reject) => {
    userDB.del(account).then((data:any) => {
      if (!data) return resolve(null);
      const jsonData = JSON.parse(data);
      return resolve(jsonData);

    }).catch((err:Error) => reject(err));
  });
}

function loginUserCache (account:string, password:string) {

  return new Promise((resolve, reject) => {
    getUserCache(account).then((data:any) => {
      console.log('data', data, account, password);
      if (!data) return resolve(null);
      if (account == data.account && password == data.password) {
        console.log('aaa');
        return resolve(data);
      }
      return resolve(null);
    }).catch((err:Error) => reject(err));
  });
}



export {
  getUserCache,
  setUserCache,
  delUserCache,
  getUserCacheAndExpireExtend,
  loginUserCache
};
