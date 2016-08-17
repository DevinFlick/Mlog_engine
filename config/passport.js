var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/user.js');

passport.use(new LocalStrategy({
  usernameField: 'email'
},
  function(username, password, done){
    User.findOne({email: username}, function(err, user){
      if(err){
        //this about it this way but we HAVE TO USE DONE
        // return res.status(500).json({
        //   msg: 'what were you trying to do? cause it no worky'
        // });
        return done(err);
      }
      if(!user){
        //this about it this way but we HAVE TO USE DONE
        // return res.status(404).json({
        //   msg: 'user not found'
        // });
        return done(null, false);
      }
      if(!user.validPassword(password)){
        //this about it this way but we HAVE TO USE DONE
        // return res.status(403).json({
        //   msg: "username or password incorrect"
        // });
        return done(null, false,{
          msg: 'password or username is incorrect'
        });
      }
      //this about it this way but we HAVE TO USE DONE
      // return res.status(200).json({
      //   user: user
      // });
      return done(null, user);
    });
  }
));
