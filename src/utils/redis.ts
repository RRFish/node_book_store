const Redis = require('ioredis');
const RedisTimeout = require('ioredis-timeout');
import { REDIS_CONFIG } from '../config';

const userDB = new Redis(REDIS_CONFIG);
RedisTimeout(userDB, 6000);

export {
  userDB
};


