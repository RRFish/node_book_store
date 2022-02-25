const Redis = require('ioredis');
const RedisTimeout = require('ioredis-timeout');
const { REDIS_CONFIG } = require('../config.js');

const userDB = new Redis(REDIS_CONFIG);
RedisTimeout(userDB, 6000);

module.exports = {
  userDB
};


