var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

router.get('/users', getUsers);
router.get('/users/:userId', getAUser);
router.post('/users', createUser);
router.put('/users/:userId', updateUser);
// router.delete('/users/:userId', deleteUser);

module.exports = router;

function getUsers(req, res, next){
  User.find({}, function(err, foundUsers){
    if(err){
      res.status(500).json({
        msg:err
      });
    } else {
      if(foundUsers){
        res.status(200).json({
          foundUsers:foundUsers
        });
      } else {
        res.status(404).json({
          msg: "dunno, can't find them dude"
        });
      }
    }
  });
};
function getAUser(req, res, next){
  User.findOne({_id:req.params.userId}, req.body, function(err, foundUser){
    if (err){
      res.status(500).json({
        msg:error
      });
    } else {
      if(foundUser) {
        res.status(200).json({
          foundUser:foundUser
        });
      } else {
        res.status(404).json({
          msg: "dunno can't find that user"
        });
      }
    }
  });
};
function createUser(req, res, next){
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    email: req.body.email,
    // signedUp: new Date(),
  });
  user.save(function (err, newUser){
    if (err){
      res.status(500).json({
        msg:err
      });
    } else {
      if (user){
        res.status(200).json({
          user:user
        });
      } else {
        res.status(400).json({
          msg: err
        });
      }
    }
  });
};
function updateUser(req, res, next){
  User.findOneAndUpdate({_id: req.params.userId}, req.body, function(err, updateUser){
    if (err){
      res.status(500).json({
        msg:err
      });
    } else {
      if (updateUser){
        updateUser:updateUser
      } else {
        res.status(404).json({
          msg: err
        })
      }
    }
  });
};
function deleteUser(req, res, next){
  User.findOneAndRemove({_id:req.params.userId},function(err, deleteUser){
    if (err){
      res.status(500).json({
        msg:err
      })
    } else {
      if(deleteUser){
        res.status(200).json({
          msg: 'Killed the user! just kidding but we did delete him...FROM THE MATRIX'
        })
      } else {
        res.status(404).json({
          msg:err
        })
      }
    }
  });
};
