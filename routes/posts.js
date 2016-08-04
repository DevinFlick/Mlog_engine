var express = require ('express');
var router = express.Router();
var Post = require('../models/post.js');

router.get('/posts', getPosts);
router.post('/posts', createPost);
router.get('/posts/:postId', getAPost);
router.delete('/posts/:postId', deleteAPost);
router.put('/posts/:postId', updateAPost);

module.exports = router;

function getPosts(req, res, next){
  Post.find({}, function(err, foundPosts){
    if (err){
      res.status(500).json({})
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
  console.log('get a certain Post');
  next();
};
function deleteAPost(req, res, next){
  console.log('delete a certain Post');
  next();
};
function updateAPost(req, res, next){
  console.log('update a certain Post');
  next();
};
