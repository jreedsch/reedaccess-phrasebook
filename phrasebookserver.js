if (!process.env.NODE_ENV) process.env.NODE_ENV='development'

var express = require('express')
  , http    = require('http')
  , path    = require('path')
  , reload  = require('reload')
  , phrases = require('./server/api/phrases')
  , colors  = require('colors')

var app = express()

var clientDir = path.join(__dirname, 'client')

app.configure(function() {
  app.set('port', process.env.PORT || 8081)
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser()) 
  app.use(app.router) 
  app.use(express.static(clientDir)) 
})

app.configure('development', function(){
  app.use(express.errorHandler());
})
var server = http.createServer(app)

reload(server, app)

server.listen(app.get('port'), function(){
  console.log("Phrasebook server is listening in %s on port %d", colors.red(process.env.NODE_ENV), app.get('port'));
});

 // return the primary html page
app.get('/', function(req, res) {
  res.sendfile(path.join(clientDir, 'index.html'))
})

 // get the DB rowcount, depending on search criteria
app.get('/api/phrases/dbrowcount', phrases.dbrowcount) //placement matters

// get the login,  
app.get('/api/phrases/login', phrases.login); //placement matters

 // hitting this Uri returns the entire phrasebook list
app.get('/api/phrases', phrases.list) 

 //hitting this Uri writes a new phrase to the DB
app.post('/api/phrases', phrases.create)

 //hitting this Uri retrieves a phrase from the DB
app.get('/api/phrases/:id', phrases.read)  //sometimes called 'show'

 // hitting this Uri deletes a phrase
app.delete('/api/phrases/:id', phrases.del)

 // hitting this Uri updates a phrase
app.put('/api/phrases/:id', phrases.update)