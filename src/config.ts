import moment from 'moment';
import dotenv from 'dotenv';
dotenv.config({ path: '.env_local' });

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  JWT_SECRET_KEY,
  REDIS_PORT,
  REDIS_HOST,
} = process.env;



const JWT_CONFIG = {
  JWT_SECRET_KEY: JWT_SECRET_KEY,
  EXPIRES_TIME: 60 * 1000
};

const REDIS_CONFIG = {
  port: REDIS_PORT,
  host: REDIS_HOST
};

const REDIS_USER_EXPIRE_TIME = 3600;

const MYSQL_CONFIG:any = {
  client: 'mysql',
  connection: {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    timezone: 'UTC',
    typeCast: function (field:any, next:any) {
      if (field.type == 'TIMESTAMP') {
        return moment(field.string()).format('YYYY-MM-DD HH:mm:ss');
      }
      return next();
    }
  }
};


export  {
  JWT_CONFIG,
  REDIS_CONFIG,
  REDIS_USER_EXPIRE_TIME,
  MYSQL_CONFIG,
};