import express from 'express';
import cors from 'cors';
import { errorHandleMiddleware } from './middleware/errorHandle';
const app = express();
const port = 3001;
import user from './routers/user';
import book from './routers/book';


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', user);
app.use('/book', book);

app.use(errorHandleMiddleware);


app.listen(port, () => {
  console.log(`server is listening in port ${port}`);
});

export {
  app
};