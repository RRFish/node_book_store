const { JWT_CONFIG } = require('../config.js');
const { JWT_SECRET_KEY, EXPIRES_TIME } = JWT_CONFIG;
const jwt = require('jsonwebtoken');



function createUserToken (id) {
  return jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: EXPIRES_TIME });
}

function userTokenVerify (token) {
  if (!token) {
    throw new Error('請傳入token');
  }
  const decoded = jwt.verify(token, JWT_SECRET_KEY);
  return decoded.id;
}






module.exports = {
  createUserToken,
  userTokenVerify
};