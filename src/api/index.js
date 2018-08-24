var express = require("express");
var router = express.Router();

var fetchUsers = require("./users").fetchUsers;

router.use((req, res, next) => {
  if(req.user) next();
  else {
    res.status(200);
    res.contentType("application/json");
    res.send("Proszę się zalogować!");
  }
})

router.get("/users", (req, res) => {
    fetchUsers(rows => {
      res.status(200);
      res.contentType("application/json");
      res.send(req.user.name + "\n" + JSON.stringify(rows));
    });
  });

exports.router = router;
