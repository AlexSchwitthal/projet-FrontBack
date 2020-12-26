const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const port = 3000;

// DB
require('./models/db.js').connectToDB();
const queries = require('./models/queries.js');

/* queries.getAllUsers().then(users => {
  console.log(users);
}) */

var newValue = {};
newValue._id = "5fe7b8d0b7562a31f0e94d6a";
newValue.content = "le copier-coller c'est mal";
queries.editTweet(newValue).then(result => {
  console.log(result);
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(session({
  secret:"FrontBack", 
  cookie:{maxAge: 24 * 60 * 60 * 1000},
  resave: true,
  saveUninitialized: true
}));

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


app.post('/addUser', async (req, res) => {
  if(req.body.login == "" || req.body.password == "") {
    res.status(500).json({error: "erreur"});
  }
  else {
    const result = await queries.addUser(req.body.login, req.body.password);
    res.json(result);
  }
});

app.put('/editUser', async (req, res) => {
  const isEdited = await queries.editUser(req.body.user);
  if(isEdited != null) {
    res.status(200).json({msg: "success"});
  }
  else {
    res.status(401).json({error: "erreur"});
  }
});

app.post('/deleteUser', async (req, res) => {
  const isDeleted = await queries.deleteUser(req.body.userId);
  if(isDeleted != null) {
    res.status(200).json({msg: "success"});
  }
  else {
    res.status(401).json({error: "erreur"});
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


app.post('/user', async (req, res) => {
  try {
    const user = await queries.getSpecificUser(req.body.login);
    if(user == null) {
      res.status(404).json({error: "erreur"});
    }
    else {
      res.status(200).json(user);
    }
  }
  catch(e) {
    res.status(401).json(e);
  }
});

app.get('/users', async (req, res) => {
  try {
    const allUsers = await queries.getAllUsers();
    res.json(allUsers);
  }
  catch(e) {
    res.status(401).json(e);
  }
});

//Gestion des publications

app.post('/addTweet', async (req, res) => {
  if(req.body.content == "" || req.body.creator_id == "") {
    res.status(500).json({error: "erreur"});
  }
  else {
    const result = await queries.addTweet(req.body.content, req.body.creator_id);
    res.json(result);
  }
});

app.post('/deleteTweet', async (req, res) => {
  const isDeleted = await queries.deleteTweet(req.body.tweet_id);
  if(isDeleted != null) {
    res.status(200).json({msg: "success"});
  }
  else {
    res.status(401).json({error: "erreur"});
  }
});

app.get('/tweet/:creatorid', async (req, res) => {
  try {
    const result = await queries.getTweetByCreatorId(req.params.creatorid);
    res.json(result);
  }
  catch(e) {
    res.status(401).json(e);
  }
});

app.put('/editTweet', async (req, res) => {
  const isEdited = await queries.editTweet(req.body.tweet);
  if(isEdited != null) {
    res.status(200).json({msg: "success"});
  }
  else {
    res.status(401).json({error: "erreur"});
  }
});

app.listen(port, () => {
  console.log('app listening to http://localhost:' + port);
})