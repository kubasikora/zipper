var express = require("express");
var router = express.Router();

var fetchUsers = require("./users").fetchUsers;

router.get("/users", (req, res) => {
  if(req.user){
    console.log(req.user.name);
    fetchUsers(rows => {
      res.status(200);
      res.contentType("application/json");
      res.send(req.user.name + "\n" + JSON.stringify(rows));
    });
  }
  else{
    res.status(401);
    res.contentType("application/json");
    res.send("zaloguj sie chuju");
  }
  });

exports.router = router;
