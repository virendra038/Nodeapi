var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var Book = require('./models/bookModel');
var app = express();

var port = process.env.PORT ||3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



mongoose.connect('mongodb://booksapi:booksapi@ds023303.mlab.com:23303/booksapi',function(err){
	if(err){
		console.log(err);
	}else{
		console.log("connected to the database");
	}
});

var bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api/books',bookRouter);

app.get('/',function(req,res){
	res.send('magic');
});

app.listen(port,function(){
	console.log('Magic happens on port' + port);
});