import { v4 as uuidv4 } from 'uuid';

function createRandomAccount () {
  const randomText = uuidv4();
  return randomText.slice(0, 20);
}

function createRandomBook () {
  const randomText = uuidv4();
  return randomText.slice(0, 10);
}


export {
  createRandomAccount,
  createRandomBook
};