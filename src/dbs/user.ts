import { knex } from '../utils/db';

function insertUser (nickname:string, account:string, password:string) {
  return knex('user').insert({
    nickname,
    account,
    password
  });
}

function getUserByAccount (account:string) {

  return knex('user').select([ 'id', 'nickname', 'account', 'password', 'createDate' ]).where({
    account
  });

}

function loginUser (account:string, password:string) {

  console.log('走loginUser');

  return knex('user').select([ 'id', 'nickname', 'account', 'password', 'createDate' ]).where({
    account,
    password
  });
}

export {
  insertUser,
  getUserByAccount,
  loginUser
};


