import { request } from '../request';
import { globalState } from '../utils/GlobalState';
import { createRandomAccount } from '../utils/randomCreate';
import { passwordEncrypt } from '../utils/passwordCrypto';
const { expect } = require('chai');

describe('user API測試', function () {

  it('註冊測試', (done:any) => {
    const newAccount = createRandomAccount();
    const newNickname = newAccount.slice(0, 6);
    const sendData = {
      nickname: newNickname,
      account: newAccount,
      password: '123456',
      passwordRe: '123456',
    };

    request
      .post('/user/register')
      .send(sendData)
      .expect({ status: 'success', code: 200 })
      .end((err:any, res:any) => {
        if (err) throw err;
        globalState.set('user', sendData);
        return done();
      });
  });

  it('登入測試', (done:any) => {

    const user = globalState.get('user');
    const { account, password }:{account:string; password:string} = user;
    const encryptedPassword = passwordEncrypt(password);
    user.encryptedPassword = encryptedPassword;
    request
      .post('/user/login')
      .send({ account,  password: encryptedPassword })
      .expect((res:any) => {
        expect(res.body).to.have.property('status', 'success');
        expect(res.body).to.have.property('code', 200);
      })
      .end((err:any, res:any) => {
        if (err) return done(err);
        globalState.set('token', res.body.data.token);
        return done();
      });
  });

  it('使用者資訊測試', (done:any) => {
    const user = globalState.get('user');
    const token = globalState.get('token');
    request
      .post('/user/userInfo')
      .set('token', token)
      .then((res:any) => {
        expect(res.body).to.have.property('status', 'success');
        expect(res.body).to.have.property('code', 200);
        expect(res.body.data).to.have.property('nickname', user.nickname);
        expect(res.body.data).to.have.property('account', user.account);
        expect(res.body.data).to.have.property('password', user.encryptedPassword);
        done();
      }).catch((err:any) => {
        if (err) return done(err);
      });

  });



});