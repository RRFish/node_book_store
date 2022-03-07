import { MYSQL_CONFIG } from '../config';
import knex from 'knex';
const db = knex(MYSQL_CONFIG);

export {
  db as knex
};
