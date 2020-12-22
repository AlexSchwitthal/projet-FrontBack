const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// DB
require('./models/db.js').connectToDB();
const queries = require('./models/queries.js');


//console.log(queries.addUser("lol", "def"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/addUser', async (req, res) => {
  const result = await queries.addUser("d", "def");
  res.send(result);
});


app.listen(port, () => {
  console.log('app listening to http://localhost:' + port);
})