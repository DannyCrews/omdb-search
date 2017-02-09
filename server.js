var fs = require('fs');
var path = require('path');
var express = require('express');
// add require for body-parser
var bodyParser = require('body-parser');
// add morgan for request logging
var logger = require('morgan');

var port = (process.env.PORT || 3000);

var app = express();

// add logger to middleware
app.use(logger("dev"));

// set up serving of static assets
// change 'join' to 'resolve' - make it crossplatform
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')));
// app.set("views", path.resolve(__dirname, "views"))
// app.set("view engine", "ejs");

// add missing ')';

app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
// add missing '})'
});

// change HTML method to POST
app.post('/favorites', function(req, res){
  if(!req.body.Type || !req.body.imdbID){
    res.send("Error");
    return
  // add missing bracket
  }
  var data = JSON.parse(fs.readFileSync('./data.json'));
  data.push(req.body);
  fs.writeFile('./data.json', JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

// correct misspell of 'listen'
app.listen(port, function(){
  console.log("Listening on port " + port);
});
