var fs = require('fs');
var path = require('path');
var express = require('express');
// add require for body-parser
var bodyParser = require('body-parser')
// add morgan for request logging
var logger = require('morgan')


var app = express();

// add logger to middleware
app.use(logger("dev"));

// set up serving of static assets
// change 'join' to 'resolve' - make it crossplatform
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.set("views", path.resolve(__dirname, "views"))
app.set("view engine", "ejs");

// add missing ')'
// change 'use' to get and render index
app.get('/', function(req, res){
  res.render("index");
});

app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
// add missing '})'
});

app.get('favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error");
    return
  // add closing '}'
  }

  var data = JSON.parse(fs.readFileSync('./data.json'));
  data.push(req.body);
  fs.writeFile('./data.json', JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

// correct misspell of 'listen'
app.listen(3000, function(){
  console.log("Listening on port 3000");
});
