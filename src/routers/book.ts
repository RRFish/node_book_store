import express from 'express';
import { queryBooks, deleteBooks, updateBook, insertBook, queryBookClass } from '../dbs/book';
import { deleteVerify, updateVerify, insertVerify } from '../dataVerify/book';
import { BookStoreResponse } from '../utils/response';
import { userTokenVerifyMiddleware } from '../middleware/userToken';
const router = express.Router();


// 書籍查詢
router.post('/query', userTokenVerifyMiddleware, function (req, res, next) {
  const { bookname, bookclassId, author, publishingHouse, createDateStart, createDateEnd } = req.body;

  queryBooks(bookname, bookclassId, author, publishingHouse, createDateStart, createDateEnd)
    .then((result) => {
      res.send(new BookStoreResponse('success', result));
      next();
    })
    .catch((err) => next(err));

});

// 書籍刪除
router.post('/delete', userTokenVerifyMiddleware, function (req, res, next) {
  const { idList } = req.body;

  deleteVerify(idList);
  deleteBooks(idList)
    .then(() => {
      res.send(new BookStoreResponse('success'));
      next();
    })
    .catch((err) => next(err));

});

// 書籍更新
router.post('/update', userTokenVerifyMiddleware, function (req, res, next) {
  const { id, bookname, bookclassId, author, publishingHouse } = req.body;

  updateVerify(id, bookname, bookclassId, author, publishingHouse);
  updateBook(id, bookname, bookclassId, author, publishingHouse)
    .then(() => {
      res.send(new BookStoreResponse('success'));
      next();
    })
    .catch((err) => next(err));

});

// 書籍新增
router.post('/insert', userTokenVerifyMiddleware, function (req, res, next) {
  const { bookname, bookclassId, author, publishingHouse } = req.body;


  insertVerify(bookname, bookclassId, author, publishingHouse);
  insertBook(bookname, bookclassId, author, publishingHouse)
    .then(() => {
      console.log('data');
      res.send(new BookStoreResponse('success'));
      next();
    })
    .catch((err) => next(err));

});

// 書籍類型查詢
router.post('/queryClass', userTokenVerifyMiddleware, function (req, res, next) {

  queryBookClass()
    .then((result) => {
      res.send(new BookStoreResponse('success', result));
      next();
    })
    .catch((err) => next(err));

});



export default router;