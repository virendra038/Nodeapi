var express = require('express');

var routes = function(Book){
	var bookRouter = express.Router();

bookRouter.route('/books')
	.post(function(req,res){
		var book = new Book();
		book.title = req.body.title;
		book.author = req.body.author;
		book.genre = req.body.genre;
		book.save();
		res.status(201).send(book);

	})
	.get(function(req,res){
		// var response = {hello:"this is an get api"};
		var query = {};
		if(req.query.genre){
			query.genre = req.query.genre;
		} 		// for params
		Book.find(query, function(err,books){
			if(err)
				res.status(500).send(err);
			else
				res.json(books);
		});
	});

bookRouter.route('/books/:bookId')
	.get(function(req,res){
		// var response = {hello:"this is an get api"};

		Book.findById(req.params.bookId, function(err,books){
			if(err)
				res.status(500).send(err);
			else
				res.json(books);
		});
	})
	.put(function(req,res){
		Book.findById(req.params.bookId,function(err,book){
			if(err)
				res.status(500).send(err);
			else
				book.title = req.body.title;
				book.author = req.body.author;
				book.genre = req.body.genre;
				book.read = req.body.read;
				book.save();
				res.json(book);

		});
	});

	return bookRouter;

};

module.exports = routes;