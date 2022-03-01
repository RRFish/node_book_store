const md5 = require('md5');

function passwordEncrypt (password) {
  return md5(password);
}


module.exports = {
  passwordEncrypt
};