const { MYSQL_CONFIG } = require('../config.js');
const knex = require('knex')(MYSQL_CONFIG);

exports.knex = knex;
