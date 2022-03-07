const seedrandom = require('seedrandom');

function createRandomNumber () {
  const seed = new Date().getTime();
  const rng = seedrandom(seed);
  return Math.floor((rng() * 10000));

}

export {
  createRandomNumber
};