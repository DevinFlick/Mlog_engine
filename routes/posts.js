var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');

router.get('/posts', getPosts);
router.post('/posts', createPost);
router.get('/posts/:postId', getAPost);
router.put('/posts/:postId', updateAPost);
router.delete('/posts/:postId', deleteAPost);

module.exports = router;

function getPosts(req, res, next){
  Post.find({}, function(err, foundPosts){
    if (err){
      res.status(500).json({
        msg:err
      })
    } else {
      res.status(200).json({
        posts: foundPosts
      })
    }
  });
};
function createPost(req, res, next){
  var post = new Post({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    created: new Date(),
    updated: new Date(),
  });
  post.save(function(err,newPost){
    if (err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(201).json({
        post: newPost
      });
    }
  });
};
function getAPost(req, res, next){
  Post.findOne({_id: req.params.postId}, req.body, function(err, foundPost){
    if (err){
      res.status(500).json({
        msg: err
      })
    }else {
      res.status(200).json({
        post: foundPost
      })
    }
  });
};
function deleteAPost(req, res, next){
  Post.findOneAndRemove({_id:req.params.postId}, function(err, deletedPost){
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
function updateAPost(req, res, next){
  Post.findOneAndUpdate({_id: req.params.postId}, req.body, function(err, oldPost){
      if(err){
        res.status(500).json({
          msg: err
        });
      } else {
        res.status(200).json({
          oldPost: oldPost
        });
      }
    });
};
