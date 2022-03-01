const express = require('express');
const router = express.Router();
const { queryBooks, deleteBooks, updateBook, insertBook, queryBookClass } = require('../dbs/book.js');
const { deleteVerify, updateVerify, insertVerify } = require('../dataVerify/book.js');
const { BookStoreResponse } = require('../utils/response');
const { userTokenVerifyMiddleware } = require('../middleware/userToken.js');


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



module.exports = router;