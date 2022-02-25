const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errorHandleMiddleware } = require('./middleware/errorHandle.js');
const app = express();
const port = 3001;
const user = require('./routers/user.js');
const book = require('./routers/book.js');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', user);
app.use('/book', book);

app.use(errorHandleMiddleware);


app.listen(port, () => {
  console.log(`server is listening in port ${port}`);
});