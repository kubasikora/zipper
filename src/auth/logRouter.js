var express = require('express')
var router = express.Router()
var passport = require("passport");
var logout = require("./logout").logout;

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login.html"
  })
);

router.get("/logout", (req, res) => {
    return logout(req, res, null);
  });

module.exports = router