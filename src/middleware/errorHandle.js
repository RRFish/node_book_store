const { BookStoreResponse } = require('../utils/response');

function errorHandleMiddleware (err, req, res, next) {
  console.log('err發生', err);
  res.send(new BookStoreResponse(err.message));
  next();
}


module.exports = {
  errorHandleMiddleware
};