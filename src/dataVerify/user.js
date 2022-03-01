function registerVerify (nickname, account, password, passwordRe) {
  if (!nickname)
    throw Error('請傳入暱稱');

  if (!account)
    throw Error('請傳入帳號');

  if (!password)
    throw Error('請傳入密碼');

  if (!passwordRe)
    throw Error('請傳入密碼確認');



  if (nickname.length > 20 || nickname.length < 6)
    throw Error('暱稱長度不可小於6或大於20');

  if (account.length > 20 || account.length < 6)
    throw Error('帳號長度不可小於6或大於20');

  if (password.length > 20 || password.length < 6)
    throw Error('密碼長度不可小於6或大於20');

  if (password != passwordRe)
    throw Error('兩次密碼不相同');

  return true;
}

function loginVerify (account, password) {
  if (!account)
    throw Error('請傳入帳號');

  if (!password)
    throw Error('請傳入密碼');

  return true;
}



module.exports = {
  registerVerify,
  loginVerify
};