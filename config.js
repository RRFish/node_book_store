const moment = require('moment');

const JWT_CONFIG = {
  JWT_SECRET_KEY: '123456',
  EXPIRES_TIME: 60 * 1000
};

const REDIS_CONFIG = {
  port: 6379,
  host: '127.0.0.1'
};

const REDIS_USER_EXPIRE_TIME = 3600;

const MYSQL_CONFIG = {
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    port: 3306,
    user : 'root',
    password : 'root',
    database : 'book_store',
    timezone: 'UTC',
    typeCast: function (field, next) {
      if (field.type == 'TIMESTAMP') {
        return moment(field.string()).format('YYYY-MM-DD HH:mm:ss');
      }
      return next();
    }
  }
};


module.exports = {
  JWT_CONFIG,
  REDIS_CONFIG,
  REDIS_USER_EXPIRE_TIME,
  MYSQL_CONFIG,
};