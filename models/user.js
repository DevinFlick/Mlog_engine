var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto'); // already in node no install required


var userSchema = new Schema ({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  signedUp:{
    type: Date,
  },
  hash:{
    type: String,
    required: false,
  },
  salt:{
    type: String,
    required: false,
  },
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
                    .toString('hex');
};

userSchema.methods.validPassword = function(password){
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
                    .toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function(){ //generate"jott" jwt is Json Web Token --> base 64 several chunks to tell the db about auth user etc, JWT expire over a period of time that you can set, commonly accepted practice sessions and cookies are other things taht expire but JWTs are commonly accepted practice,

};

var User = mongoose.model('User', userSchema);
module.exports = User;
