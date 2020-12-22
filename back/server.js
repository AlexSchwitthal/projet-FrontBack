const express = require('express');
const app = express();
const port = 3000;

// DB
require('./models/db.js').connectToDB();
const queries = require('./models/queries.js');

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log('app listening to http://localhost:' + port);
})