var express = require("express");
var router = express.Router();
var passport = require("passport");
var logout = require("./logout").logout;
var register = require("./register").register;
var changePassword = require("./changePassword").changePassword;
var deserializeUser = require("./deserialize").deserializeUser;

/*
router.post("/login",passport.authenticate("local", {
  successRedirect: "https://zipappfe-zipper.wedeploy.io/home",
  failureRedirect: "https://zipappfe-zipper.wedeploy.io"
  }), function(req, res) {
   // res.redirect('https://zipappfe-zipper.wedeploy.io/home')
  }
);
*/

function serialize(req, res, next) {  
  db.updateOrCreate(req.user, function(err, user){
    if(err) {return next(err);}
    next();
  });
}
const db = {  
  updateOrCreate: function(user, cb){
    cb(null, user);
  }
};

const serializeUser = (req, done) => {
  return done(null, user.userID);
};

passport.deserializeUser((id, done) => deserializeUser(id, done));

const expressJwt = require('express-jwt');  
const authenticate = expressJwt({secret : 'server secret'});
router.get('/me', authenticate, function(req, res) {  
  res.status(200).json(req.user);
});

const jwt = require('jsonwebtoken');
function generateToken(req, res, next) {  
  req.token = jwt.sign({
    id: req.user.id,
  }, 'server secret');
  next();
}

function respond(req, res) { 
  res.cookie("authToken", req.token, {"maxAge": 86400000});
  res.cookie("username", req.user.name, {"maxAge": 86400000});
  res.cookie("userID", req.user.userID, {"maxAge": 86400000});
  res.status(200).json({
    user: req.user,
    token: req.token
  });
}

router.post('/login', passport.authenticate(  
  'local', {
    session: true
  }), serialize, generateToken, respond);

router.post("/register", (req, res) => {
  return register(req, res);
});

router.post("/changePassword", authenticate, (req, res) => {
  return changePassword(req, res);
});

router.get("/logout", (req, res) => {
  return logout(req, res, null);
});

module.exports = router;
//kocham Cię <3