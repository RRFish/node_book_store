const { knex } = require('../utils/db.js');

function insertUser (nickname, account, password) {
  return new Promise((resolve, reject) => {
    knex('user').insert({
      nickname,
      account,
      password
    })
      .then((result) => {
        return resolve(result);
      }).catch((err) => {
        reject(err);
      });
  });
}

function getUserByAccount (account) {
  return new Promise((resolve, reject) => {
    knex('user').select([ 'id', 'nickname', 'account', 'password', 'createDate' ]).where({
      account
    })
      .then((result) => {
        return resolve(result);
      }).catch((err) => {
        reject(err);
      });
  });
}

function loginUser (account, password) {
  return new Promise((resolve, reject) => {
    knex('user').select([ 'id', 'nickname', 'account', 'password', 'createDate' ]).where({
      account,
      password
    })
      .then((result) => {
        return resolve(result);
      }).catch((err) => {
        reject(err);
      });
  });
}

module.exports = {
  insertUser,
  getUserByAccount,
  loginUser
};


