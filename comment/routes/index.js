var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/comments', function(req, res, next) {
	Comment.find(function(err, comments) {
		if(err) { return next(err); }
		res.json(comments);
	});
});

router.get('/comments/:comment', function(req, res) {
	res.json(req.comment);
});

router.post('/comments', function(req, res, next) {
	var comment = new Comment(req.body);
	comment.save(function(err, comment) {
		if(err) { return next(err); }
		res.json(comment);
	});
});

router.put('/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }
    res.json(comment);
  });
});

router.param('comment', function(req, res, next, id) {
 var query = Comment.findById(id);
  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error("can't find comment")); }
    req.comment = comment;
    return next();
  });
});

module.exports = router;
