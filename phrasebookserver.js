//heroku deployed version
var express = require('express')
  , http    = require('http')
  , path    = require('path')
  , reload  = require('reload')
  , phrases = require('./server/api/phrases')
  , colors  = require('colors')

var logfmt = require("logfmt");

var app = express();

var clientDir = path.join(__dirname, 'client')

app.configure(function() {
  app.set('port', process.env.PORT || 8081)
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser()) 
  app.use(app.router) 
  app.use(express.static(clientDir)) 
})

app.use(logfmt.requestLogger());

app.configure('development', function(){
  app.use(express.errorHandler());
})

var server = http.createServer(app)
reload(server, app)

app.get('/', function(req, res) {
  res.send('Hello from ReedAccess Phrasebook!');
});

server.listen(app.get('port'), function(){
  console.log("Phrasebook server is listening in %s on port %d", colors.red(process.env.NODE_ENV), app.get('port'));
});


// return the primary html page
app.get('/', function(req, res) {
  res.send("Hello Reedaccess Phrasebook");
  //res.sendfile(path.join(clientDir, 'index.html'))
})