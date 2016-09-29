var express = require('express');
var router = express.Router();

var UserModel = require('../models/user');
//var Chat = require('../models/chat');
var path = require('path');
var root = path.join(__dirname,'..','public');

var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var passport = require('passport');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

/* GET users listing. */
router.get('/login', passport.authenticate('jwt' , {session : false}),function(req, res, next) {
	res.sendFile('login.html' , {root:root});
});


router.get('/register', function(req, res, next) {
	res.sendFile('login.html' , {root:root});
});

router.post('/login', function(req, res, next){
  var user = {
    'username' : req.body.login_username,
    'password' : req.body.login_password
  };

  UserModel.findOne(user, function(err, userObj){
    if(err)
      console.error();

    if(userObj) {
      var token = jwt.sign({username : user.username} , 'nikeshpatel');
      token = 'JWT'+token;

      userObj.online = true;
      res.send(token);
    }
    else {
      console.log("User doesn't exist");
      res.send('fail');
    }
  });
});


router.post('/register', function(req, res, next) {
  var userName = req.body.reg_username;
  var userPass = req.body.reg_password;
  var confirmPass = req.body.reg_conpassword;
  console.log("register");


  if(confirmPass != userPass) {
    res.send('The passwords do not Match');
  	//res.redirect('/users/register');
  }
  else {

  UserModel.findOne({"username":userName}, function(err, user) {
  	if(err) {
  		console.log("error");
  		res.send(err);
  	}
  	else {
  		/*console.log(user);
  		console.log("done");*/

  		if(user) {
  			console.log('User Already exists.');
  			res.redirect("/users/login");
  		}
  		else {
  		  var newUser = new UserModel({"username": userName, "password": userPass , "online" : false/*, "name":name, "email": email, "phone": phone*/});
  		  newUser.save(function(err, user) {
  		    if(err) console.log(err);
  		      console.log("Registration Successful. " + newUser);
  		      res.redirect('/users/login');
  	});
  	//console.log("Registration Successful. " + newUser);
  	}
  }

  });
}
});

router.post('/listusers',function(req,res,next){

  res.sendFile('listuser.html' , {root:root});
});
