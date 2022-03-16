import express from 'express';
import cors from 'cors';
import { errorHandleMiddleware } from './middleware/errorHandle';
const app = express();
const port = 3001;
import user from './routers/user';
import book from './routers/book';
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger.json') // 剛剛輸出的 JSON

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/user', user);
app.use('/book', book);

app.use(errorHandleMiddleware);


app.listen(port, () => {
  console.log(`server is listening in port ${port}`);
});

export {
  app
};