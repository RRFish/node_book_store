import { JWT_CONFIG } from '../config';
const jwt = require('jsonwebtoken');


const { JWT_SECRET_KEY, EXPIRES_TIME } = JWT_CONFIG;



function createUserToken (account:number, verifyCode:number) {
  return jwt.sign({ account, verifyCode }, JWT_SECRET_KEY, { expiresIn: EXPIRES_TIME });
}

function userTokenVerify (token:string) {
  if (!token) {
    throw new Error('請傳入token');
  }
  const decoded = jwt.verify(token, JWT_SECRET_KEY);
  return decoded;
}






export {
  createUserToken,
  userTokenVerify
};