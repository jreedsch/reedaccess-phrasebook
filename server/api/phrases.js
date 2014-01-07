// mongojs docs:  https://github.com/mafintosh/mongojs

var fs = require('fs-extra')
  , path = require('path')
  , _ = require('underscore')


module.exports.list   = list
module.exports.create = create
module.exports.read   = read
module.exports.show   = read
module.exports.update = update
module.exports.del    = del
module.exports.dbrowcount  = dbrowcount
module.exports.login  = login

var databaseUrl = "mongodb://reedsch:colorado@dharma.mongohq.com:10043/app20783754";
//var databaseUrl = "test";
var collections   = ["phrasebook", "administrators", "phrasebookedit"];
var db = require("mongojs").connect(databaseUrl, collections);

var mongo = require('mongodb');
var BSON = mongo.BSONPure;

/**********************
 * Public Interface
 **********************/

//
// return the entire list of phrases
//
function list (req, res) {

  var offsetnum  = ~~req.query.offset || 0,  //~~ for numeric input??
      limitnum   = ~~req.query.limit || 10;
  var searchterm = req.query.searchterm, 
      searchlang = req.query.searchlang;     

  // set up search term & sort, both have variable column names
  var name = searchlang; 

  //var qvalue = "{$gte : \'"+ searchterm +"\'}"; 
  var qvalue = {};
  qvalue["$gte"] = searchterm;

  var query = {}; 
  query[name] = qvalue; 

  var cname = searchlang; 
  var sortcolname = {};
  sortcolname[cname] = 1;


  console.log("list, offset: "+offsetnum+", limit: "+limitnum+", searchterm: "+searchterm+", lang: "+searchlang);
console.log("query: "+objToString(query) );
console.log("query string: "+objToString(qvalue) );
console.log("sort column: "+objToString(sortcolname) );

   // Query in MongoDB via Mongo JS Module
   //db.phrasebook.find({}).toArray(function(err, phrases)         { 
  //db.phrasebook.find( {"english": {$gte: searchterm}}).sort({searchlang: 1}).limit(limitnum).toArray(function(err, phrases)  {  
  //db.phrasebook.find(query).sort(sortcolname).limit(limitnum).toArray(function(err, phrases)  { 
  //db.phrasebook.find(query).sort({english: 1}).limit(limitnum).toArray(function(err, phrases)  {    

db.phrasebook.find(query).skip(offsetnum).sort(sortcolname).limit(limitnum).toArray(function(err, phrases)  {  


	if( err || !phrases) console.log("No "+searchlang+" phrases found");
	  else 
	{ 
           console.log("FOUND "+searchlang+" phrases, count: "+phrases.length);
           res.json(phrases);
     }
  });
 
}

/*
function listold (req, res) {
  var offsetnum = ~~req.query.offset || 0
    , limitnum = ~~req.query.limit || 10

  var skipnum = 0;
  if (offsetnum > 0) skipnum = offsetnum * limitnum;

  console.log("list(), offset: "+offsetnum+", skip: "+skipnum+", limit: "+limitnum);

   // Query in MongoDB via Mongo JS Module
  db.phrasebook.find({}).skip(skipnum).limit(limitnum).toArray(function(err, phrases)         { 

	if( err || !phrases) console.log("No phrases found");
	  else 
	{ 
           console.log("FOUND phrases, count: "+phrases.length);
           res.json(phrases);
     }
  });

}
*/

//
// save a new phrase
//
function create (req, res) {
var adddata = req.body;
  var phraseData = adddata.phrase;
  var adminuser  = adddata.adminuser;

  console.log("NEW Phrase : "+objToString(phraseData)+", admin? :"+adminuser);

  if (adminuser) {
     db.phrasebook.save(phraseData,
       function(err, saved) { // Query in MongoDB via Mongo JS Module
           if( err || !saved ) 
              res.json(formatRespData(0,"Phrase not saved")); 
           else 
              res.json(formatRespData(1, "Phrase saved"));
     });
  } else {
     db.phrasebookedit.save(phraseData,
       function(err, saved) { 
           if( err || !saved ) 
              res.json(formatRespData(0,"Phrase not saved")); 
           else 
              res.json(formatRespData(1, "Phrase saved"));
     });
  }
 
}

//
// retrieve an existing phrase
//
function read (req, res) {
  //var id = ~~req.params.id
  var id = req.params.id
  //var name = req.params.name

  console.log("phrases.js function=read, id="+id+", req="+objToString(req.params));

  var o_id = new BSON.ObjectID(id);

  db.phrasebook.find({'_id': o_id}, function(err, phrase) {   
	if( err || !phrase) console.log("phrase id "+id+" not found");
	  else 
	{ 
           console.log("READ Phrase: "+objToString(phrase[0]));
           res.json(formatRespData(phrase));
     }
  });

}

//
// update a phrase
//
function update (req, res) {
  var id = req.params.id

  var updatedata = req.body;
  var phraseData = updatedata.phrase;
  var adminuser  = updatedata.adminuser;

  //console.log("phrases.js function=update, id="+id+", req="+objToString(req.params));
  console.log("update data:"+objToString(phraseData)+",  adminuser: "+adminuser);

  //admin users updates get written directly to the DB
  if (adminuser) {
     console.log("admin users updates are written directly to the DB")
     var o_id = new BSON.ObjectID(id);

     db.phrasebook.update({'_id': o_id}, {'english': phraseData.english, 'chinese': phraseData.chinese, 'russian': phraseData.russian, 'japanese': phraseData.japanese, 'vietnamese': phraseData.vietnamese, 'spanish': phraseData.spanish, 'german': phraseData.german }, function(err, phrase) {  
       if( err ) {
           console.log("phrase id "+id+" not updated");
		res.json(formatRespData(0, err))
	  }  else { 
           console.log("UPDATE Phrase: "+objToString(phraseData));
           res.json(formatRespData({}));
       }
     });

  //non-admin users updates get emailed to an admin

  } else {

    console.log("non-admin users updates are written to a separate collection")
    db.phrasebookedit.save(phraseData,
       function(err, saved) { // Query in MongoDB via Mongo JS Module
           if( err || !saved ) 
              res.json(formatRespData(0,"Phrase not saved")); 
           else 
              res.json(formatRespData(1, "Phrase saved"));
    });



  /* no emails right now, until we figure out how to keep the passwrod safe!
     console.log("non-admin users updates are sent by email to an admin");
     var server 	= email.server.connect({
        user:    "reedsch", 
        password:"", 
        host:    "smtp.gmail.com", 
        ssl:     true
     });
    
     var phrasecontent = objToString(phraseData);

     var message	= {
        text:	phrasecontent,  //"i hope this works", 
        from:	"you <reedsch@gmail.com>", 
        to:	"me <reedsch@gmail.com>, another <another@gmail.com>",
        //cc:	"else <else@gmail.com>",
        subject:	"addition to PhraseBook"
        //, attachment: 
        //[
        //   {data:"<html>i <i>hope</i> this works!</html>", alternative:true},
        //   {path:"path/to/file.zip", type:"application/zip", name:"renamed.zip"}
        //]
      };

      server.send(message, function(err, message) { 
	    console.log(err || message); 
      });

      res.json(formatRespData({}));
 */

   }
}

//
// delete a phrase
//
function del (req, res) {

  var id = req.params.id

  console.log("phrases.js function=delete, id="+id+", req="+objToString(req.params));

  var o_id = new BSON.ObjectID(id);

  db.phrasebook.remove({'_id': o_id}, function(err, phrase) {  
	if( err || !phrase) {
           console.log("phrase id "+id+" not deleted");
           res.json(formatRespData(0, err))
	}  else { 
           console.log("DELETE Phrase: "+objToString(phrase[0]));
           res.json(formatRespData(1,"Phrase Deleted"));
     }
  });
}


//
// get count of phrase records
//
function dbrowcount (req, res) {

  
  var searchterm = req.query.searchterm, 
      searchlang = req.query.searchlang;     
  var name = searchlang; 
  var qvalue = {};
  qvalue["$gte"] = searchterm;
  var query = {}; 
  query[name] = qvalue; 
  console.log("phrases.dbrowcount, query: "+objToString(query));
  console.log("phrases.dbrowcount, search term: "+objToString(qvalue));

  //db.phrasebook.count(function(err, total) {  
  db.phrasebook.count(query, function(err, total) {  
	if( err || !total) console.log("dbrowcount, no phrases counted for search term: ");
	  else 
	{ 
           console.log("dbrowcount RECORD COUNT for search term  : "+total);
           res.json({total: total});
     }
  });

}

//
// get login
//
function login (req, res) {

  var username = req.query.username, 
      password = req.query.password;     
  var usernamefield = "name"; 
  var passwordfield = "password"; 
  var query = {}; 
  query[usernamefield] = username; 
  query[passwordfield] = password;

  console.log("phrases.login, query: "+objToString(query));
  //console.log("phrases.login, search term: "+objToString(qvalue));
 
   db.administrators.findOne(query, function(err, login) {  
	if( err) {
        console.log("login, no users for username: "+username);
	}  else { 
        if (login) {
           console.log("login record for "+username+": "+objToString(login));
           res.json({login: login});
        } else {
           console.log("no login record for "+username);
           res.json({login: login});
        }
     }
  });
}



/*******************
 * Private Methods
 *******************/

function formatRespData (code, content) {
  if (typeof code === 'object') {
    content = code,
    code = 1 //0 failure, 1 = success
  }

  return {
    code: code,
    content: content
  }
}

function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
}




