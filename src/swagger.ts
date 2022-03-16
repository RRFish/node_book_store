const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json'; // 輸出的文件名稱
const endpointsFiles = ['./src/index.ts']; // 要指向的 API，通常使用 Express 直接指向到 index.js 就可以

swaggerAutogen(outputFile, endpointsFiles); // swaggerAutogen 的方法