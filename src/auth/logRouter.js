var express = require("express");
var router = express.Router();
var passport = require("passport");
var logout = require("./logout").logout;
var register = require("./register").register;
var changePassword = require("./changePassword").changePassword;

router.post("/login",passport.authenticate("local", {
  }), function(req, res) {
    res.redirect('/')}
);

router.post("/register", (req, res) => {
  return register(req, res);
});

router.post("/changePassword", (req, res) => {
  return changePassword(req, res);
});

router.get("/logout", (req, res) => {
  return logout(req, res, null);
});

module.exports = router;
//kocham Cię <3