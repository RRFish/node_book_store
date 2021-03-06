function deleteVerify (idList:Array<number>) {
  if (!idList || idList.length <= 0)
    throw Error('請傳入要刪除的書籍');
  return true;
}

function updateVerify (id:number, bookname:string, bookclassId:number, author:string, publishingHouse:string) {
  if (!id)
    throw Error('請傳入id');

  if (bookname && typeof (bookname) != 'string')
    throw Error('bookname 請傳入字串型態');

  if (author && typeof (author) != 'string')
    throw Error('author 請傳入字串型態');

  if (publishingHouse && typeof (publishingHouse) != 'string')
    throw Error('publishingHouse 請傳入字串型態');
  return true;
}

function insertVerify (bookname:string, bookclassId:number, author:string, publishingHouse:string) {
  if (typeof (bookname) != 'string' || bookname.length <= 0)
    throw Error('請傳入正確書名');

  if (!bookclassId)
    throw Error('請傳入正確書類');

  if (typeof (author) != 'string' || author.length <= 0)
    throw Error('請傳入正確作者名');

  if (typeof (publishingHouse) != 'string' || publishingHouse.length <= 0)
    throw Error('請傳入正確出版社');
  return true;
}

export {
  deleteVerify,
  updateVerify,
  insertVerify
};