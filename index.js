var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var commentRouter = require('./routes/comments.js'); //injects middleware we just made into this server
var postRouter = require('./routes/posts.js');
var mongoose = require('mongoose');

var port = process.env.PORT || 8080;
var mongoURI = process.env.MONGOURI || require('./config.js').mongoURI;

mongoose.connect(mongoURI);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));
server.use(cors());
server.use(commentRouter);
server.use(postRouter);

server.get('/', function(req, res){
  res.send('HEEEEEEEEEEEEEY');
});

server.listen(port, function(){
  console.log('Now listening to ya dude! On port:' + port);
});
