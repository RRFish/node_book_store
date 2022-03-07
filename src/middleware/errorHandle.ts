import { BookStoreResponse } from '../utils/response';

function errorHandleMiddleware (err:any, req:any, res:any, next:any) {
  res.send(new BookStoreResponse(err.message));
  next();
}


export {
  errorHandleMiddleware
};