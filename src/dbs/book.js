const { knex } = require('../utils/db.js');

function queryBooks (bookname, bookclassId, author, publishingHouse, createDateStart, createDateEnd) {

  return new Promise((resolve, reject) => {

    let query = knex('book').select([ 'id', 'bookname', 'bookclassId', 'author', 'publishingHouse', 'createDate' ]);

    if (bookname)
      query = query.whereLike('bookname', `%${bookname}%`);

    if (author)
      query = query.whereLike('author', `%${author}%`);

    if (publishingHouse)
      query = query.whereLike('publishingHouse', `%${publishingHouse}%`);

    if (bookclassId)
      query = query.where('bookclassId', bookclassId);

    if (createDateStart)
      query = query.where('createDate', '>=', createDateStart);

    if (createDateEnd)
      query = query.where('createDate', '<=', createDateEnd);

    query
      .then((result) => {
        return resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function deleteBooks (idList) {

  return new Promise((resolve, reject) => {
    let query = knex('book').whereIn('id', idList).del();

    query
      .then((result) => {
        return resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function updateBook (id, bookname, bookclassId, author, publishingHouse) {

  return new Promise((resolve, reject) => {
    let query = knex('book').where('id', id);

    if (bookname)
      query = query.update('bookname', bookname);

    if (bookclassId)
      query = query.update('bookclassId', bookclassId);

    if (author)
      query = query.update('author', author);

    if (publishingHouse)
      query = query.update('publishingHouse', publishingHouse);

    query
      .then((result) => {
        return resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function insertBook (bookname, bookclassId, author, publishingHouse) {

  return new Promise((resolve, reject) => {
    let query = knex('book').insert({
      bookname,
      bookclassId,
      author,
      publishingHouse
    });

    query
      .then((result) => {
        return resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function queryBookClass () {

  return new Promise((resolve, reject) => {
    let query = knex('bookclass').select([ 'id', 'name' ]).orderBy('id');

    query
      .then((result) => {
        return resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}



module.exports = {
  queryBooks,
  deleteBooks,
  updateBook,
  insertBook,
  queryBookClass
};


