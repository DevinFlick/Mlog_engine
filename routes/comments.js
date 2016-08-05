var express = require('express');
var router = express.Router();
var Comment = require('../models/comment.js');

router.get('/comments/:postId', getCommentsForAPost);
router.post('/comments', createComment);
router.delete('/comments/:commentId', deleteComment);
router.put('/comments/:commentId', updateComment);

module.exports = router;
//above is basic requirements for a router
//dont do get but the next three
function getCommentsForAPost(req, res, next){
  Comment.find({post: req.params.postId}, function(err, comments){  // req.params.xxx has to match the above route
    if(err) {
      res.status(500).json({
        msg: err
      })
    } else{
      if(comments){
        res.status(200).json({
          comments: comments
        });
      } else {
        res.status(404).json({
          msg: "Couldn't find that thing man..."
        })
      }
    }
  })
}
function createComment(req, res, next){
  var comment = new Comment({
    author : req.body.author,
    body : req.body.body,
    created : new Date(),
    updated : new Date(),
    post : req.body.post,
  });
  comment.save(function(err, newComment){
    if (err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(201).json({
        comment: newComment
      });
    }
  });
};
function deleteComment(req, res, next){
  Comment.findOneAndRemove({_id:req.params.postId}, function(err, deletedComment){
    if (err){
      res.status(500).json({
        msg: err
      })
    } else {
      res.status(200).json({
        msg: "deleted the post"
      })
    }
  });
};
function updateComment(req, res, next){
  Comment.findOneAndUpdate({_id:req.params.postId}, function(err, updatedComment){
    if (err){
      res.status(500).json({
        msg: err
      })
    } else {
      res.status(200).json({
        oldComment: oldComment
      })
    }
  });
};
