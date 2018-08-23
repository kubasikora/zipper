var express = require("express");
var router = express.Router();

var fetchUsers = require("./users").fetchUsers;

router.get("/users", (req, res) => {
    fetchUsers(rows => {
      res.status(200);
      res.contentType("application/json");
      res.send(rows);
    });
  });

exports.router = router;
