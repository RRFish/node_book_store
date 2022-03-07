import { request } from '../request';
import { globalState } from '../utils/GlobalState';

describe('登出 API測試', function () {

  it('登出成功測試', (done:any) => {
    const token  = globalState.get('token');

    request
      .post('/user/logout')
      .set('token', token)
      .expect({ status: 'success', code: 200 })
      .end((err:any, res:any) => {
        if (err) return done(err);
        return done();
      });
  });

});