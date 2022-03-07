import { app } from '../src/index';
const supertest = require('supertest');
const request = supertest(app);

export {
  request
};