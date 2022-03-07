const md5 = require('md5');

function passwordEncrypt (password:string):string {
  return md5(password);
}

export {
  passwordEncrypt
};