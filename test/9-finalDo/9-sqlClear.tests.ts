
import { sqlClear } from '../utils/sqlClear';

describe('清除資料庫資料...', function () {

  it('清除資料庫資料...', (done:any) => {
    sqlClear().then(() => {
      done();
    }).catch((err:any) => {
      done(err);
    });
  });
});
