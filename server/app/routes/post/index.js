'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

router.get('/', function(req, res, next) {
	Post.find({}, function(err, data) {
		res.json(data);
	});
});

router.get('/:id', function(req, res, next) {
	res.json(req.requestedPost);
});

router.post('/', function(req, res, next) {
	Post.create(req.body, function(err, inserted) {
		if (err) throw err;
		res.json(inserted);
	});
});

router.param('id', function(req, res, next, id) {
	Post.findById(id, function(err, post) {
		if(err) return next(err);
		if(!post) return res.status(404).end();
		req.requestedPost = post;
		next();
	});
});


module.exports = router;