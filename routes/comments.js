var express = require('express');
var router = express.Router();
var Comment = require('../models/comment.js')

router.get('/comments/:postId', getCommentsForAPost);
router.post('/comments', createComment);
router.delete('/comments/:commentId', deleteComment);
router.put('/comments/:commentId', updateComment);

module.exports = router;
//above is basic requirements for a router

function getCommentsForAPost(req, res, next){
  console.log('creating a comment');
  next();
}
function createComment(req, res, next){
  console.log('creating a comment');
  next();
}
function deleteComment(req, res, next){
  console.log('deleting a comment');
  next();
}
function updateComment(req, res, next){
  console.log('updating a comment');
  next();
}
