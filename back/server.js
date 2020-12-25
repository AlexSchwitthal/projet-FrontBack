const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const port = 3000;

// DB
require('./models/db.js').connectToDB();
const queries = require('./models/queries.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(session({secret:"FrontBack", cookie:{maxAge: 24 * 60 * 60 * 1000}}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
  ssn = req.session; 
  next();
})

app.use(cors({credentials: true, origin: 'http://localhost:4200'}));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.post('/addUser', async (req, res) => {
  if(req.body.login == "" || req.body.password == "") {
    res.status(500).json({error: "erreur"});
  }
  else {
    const result = await queries.addUser(req.body.login, req.body.password);
    res.json(result);
  }
});

app.post('/login', async (req, res) => {
  const user = await queries.getUserByLoginAndPassword(req.body.login, req.body.password);
	if(user != null && user != "-1") {
    req.session.userId = user._id;
    res.status(200).json(user);
  }
	else {
    res.status(401).json({error: "erreur"});
	}
});

app.get('/isLogged', async (req, res) => {
  if(!ssn.userId) {
    return res.status(401).json({msg: "erreur"});
  }
  else {
    const user = await queries.getUserById(ssn.userId);
    if(user == null) {
      return res.status(401).json({msg: "erreur"});
    }
    else {
      return res.status(200).json({user: user});
    }
  }
});

app.get('/logout', (req, res) => {
  ssn.destroy(error => {
      if(error) return res.status(409).json({msg:"error"});
      res.status(200).json({msg: "Logout OK"});
  });
});

app.get('/users', async (req, res) => {
  try {
    const allUsers = await queries.getAllUsers();
    console.log(allUsers);
    res.status(200).json({users : JSON.stringify(allUsers)});
  }
  catch(e) {
    res.status(401).json(e);
  }
});

app.listen(port, () => {
  console.log('app listening to http://localhost:' + port);
})