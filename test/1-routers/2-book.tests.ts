import { request } from '../request';
import { globalState } from '../utils/GlobalState';
import { createRandomBook } from '../utils/randomCreate';
const { expect } = require('chai');


describe('book API測試', function () {

  it('新增書籍測試', (done:any) => {
    const token = globalState.get('token');
    const newBookname = createRandomBook();
    globalState.set('bookname', newBookname);
    const sendData = {
      bookname: newBookname,
      bookclassId: 1,
      author: 'test',
      publishingHouse: 'test'
    };

    request
      .post('/book/insert')
      .set('token', token)
      .send(sendData)
      .expect((res:any) => {
        expect(res.body).to.have.property('status', 'success');
        expect(res.body).to.have.property('code', 200);
      })
      .end((err:any, res:any) => {
        if (err) return done(err);
        return done();
      });
  });

  it('查詢書籍測試', (done:any) => {
    const token = globalState.get('token');
    const bookname = globalState.get('bookname');

    const sendData = {
      bookname: bookname,
      bookclassId: undefined,
      author: '',
      publishingHouse: '',
      createDateStart: '',
      createDateEnd: '',
    };

    request
      .post('/book/query')
      .set('token', token)
      .send(sendData)
      .expect((res:any) => {
        expect(res.body).to.have.property('status', 'success');
        expect(res.body).to.have.property('code', 200);
        expect(res.body).to.have.property('data');
      })
      .end((err:any, res:any) => {
        if (err) return done(err);
        globalState.set('book', res.body.data[0]);
        return done();
      });
  });

  it('修改書籍測試', (done:any) => {

    const token = globalState.get('token');
    const book = globalState.get('book');
    const sendData = {
      id: book.id,
      bookname: book.bookname + 'test',
      bookclassId: 2,
      author: book.author + 'test',
      publishingHouse: book.publishingHouse + 'test'
    };
    const updateBook = sendData;

    request
      .post('/book/update')
      .set('token', token)
      .send(sendData)
      .then((res:any) => {

        expect(res.body).to.have.property('status', 'success');
        expect(res.body).to.have.property('code', 200);
      })
      .then((res:any) => {
        const sendData = {
          bookname: book.bookname
        };
        return request
          .post('/book/query')
          .set('token', token)
          .send(sendData);
      }).then((res:any) => {
        const data = res.body.data[0];
        expect(res.body).to.have.property('status', 'success');
        expect(data.id).to.equal(updateBook.id);
        expect(data.bookname).to.equal(updateBook.bookname);
        expect(data.bookclassId).to.equal(updateBook.bookclassId);
        expect(data.author).to.equal(updateBook.author);
        expect(data.publishingHouse).to.equal(updateBook.publishingHouse);

        done();
      }).catch((err:any) => {
        return done(err);
      });
  });

  it('刪除書籍測試', (done:any) => {

    const token = globalState.get('token');
    const book = globalState.get('book');
    const sendData = {
      idList: [ book.id ],
    };

    request
      .post('/book/delete')
      .set('token', token)
      .send(sendData)
      .then((res:any) => {

        expect(res.body).to.have.property('status', 'success');
        expect(res.body).to.have.property('code', 200);
      })
      .then((res:any) => {
        const sendData = {
          bookname: book.bookname
        };
        return request
          .post('/book/query')
          .set('token', token)
          .send(sendData);
      }).then((res:any) => {
        const data = res.body.data[0];
        expect(res.body).to.have.property('status', 'success');
        expect(res.body.data).to.be.empty;

        done();
      }).catch((err:any) => {
        return done(err);
      });
  });



});