require('rootpath')();
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const mongoClient = require("mongodb").MongoClient;
const config = require('config.json');
const obj_q = require ("./parser/file");
const fs = require('fs');

var https = require('https');
var http = require('http');

var options = {
  key: fs.readFileSync('key/client-key.pem'),
  cert: fs.readFileSync('key/client-cert.pem')
};

http.createServer(app).listen(8080);
https.createServer(options, app).listen(4443);


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use("/clients_photo", express.static(__dirname + "/clients_photo"));
app.use("/clients_document_photo", express.static(__dirname + "/clients_document_photo"));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: [
  '/api/users/authenticate',
  '/api/users/register',
  '/api/users/foto'
] }));

// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));
app.use('/api/quest', require('./controllers/api/quest.controller'));

// write question module
app.post("/write", function(req, res){
    mongoClient.connect(config.connectionString, function(err, client){
      let count=0;
      for (key in obj_q){
        client.db("test").collection("Quest").insert(obj_q[key]);
        count++;
      }
        res.send(count.toString());
        client.close();
      });
  });

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});
