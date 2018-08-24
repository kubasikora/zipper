var express = require("express");
var router = express.Router();

var login = require("./login").login;

router.post("/login", (req, res) => {
  res.status(200);
  console.log(req);
  res.contentType("application/json");
  res.send("ok");
});

exports.router = router;
