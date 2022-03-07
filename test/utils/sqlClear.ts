import { knex } from '../../src/utils/db';

const Exclude_Tables = [ 'bookclass' ];

function getAlltables () {
  return knex.raw('show tables;');
}

function clearTable (tableName:string) {
  return knex(tableName).delete();

}

function sqlClear () {
  return new Promise((resolve, reject) => {
    getAlltables().then((data:any) => {
      const clearPromiseList:any = [];

      data[0].forEach((item:any) => {
        if (!Exclude_Tables.includes(item.Tables_in_book_store))
          clearPromiseList.push(clearTable(item.Tables_in_book_store));
      });

      Promise.all(clearPromiseList).then(() => {
        resolve(undefined);
      });
    });
  });

}

export {
  sqlClear
};