import { ObjectType } from 'typescript';
import { knex } from '../utils/db';

function queryBooks (bookname:string, bookclassId:number, author:string, publishingHouse:string, createDateStart:string, createDateEnd:string) {

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

  return query;
}

function deleteBooks (idList:Array<number>) {

  return knex('book').whereIn('id', idList).del();
}

function updateBook (id:number, bookname:string, bookclassId:number, author:string, publishingHouse:string) {
  const query = knex('book').where('id', id);

  const updateData:object = {
    bookname,
    bookclassId,
    author,
    publishingHouse
  };
  const filterUpdateData = {};

  Object.keys(updateData).forEach((key) => {
    const data = updateData[key as keyof typeof updateData];
    if (data) {
      filterUpdateData[key as keyof typeof updateData] = data;
    }
  });

  return query.update(filterUpdateData);
}

function insertBook (bookname:string, bookclassId:number, author:string, publishingHouse:string) {

  return knex('book').insert({
    bookname,
    bookclassId,
    author,
    publishingHouse
  });
}

function queryBookClass () {

  return knex('bookclass').select([ 'id', 'name' ]).orderBy('id');
}



export {
  queryBooks,
  deleteBooks,
  updateBook,
  insertBook,
  queryBookClass
};


