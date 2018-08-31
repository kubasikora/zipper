var express = require("express");
var router = express.Router();

var fetchUsers = require("./users").fetchUsers;
var fetchTeamsOrderedByGroup = require("./teams").fetchTeamsOrderedByGroup;
var addTeam = require("./addTeam").addTeam;
var addBet = require("./addBet").addBet;

router.use((req, res, next) => {
  if (req.user) next();
  else {
    res.status(200);
    res.contentType("application/json");
    res.send("Proszę się zalogować!");
  }
});

router.get("/users", (req, res) => {
  fetchUsers(rows => {
    res.status(200);
    res.contentType("application/json");
    res.send(req.user.name + "\n" + JSON.stringify(rows));
  });
});

router.get("/teams", (req, res) => {
  fetchTeamsOrderedByGroup(rows => {
    res.status(200);
    res.contentType("application/json");
    res.send(req.user.name + "\n" + JSON.stringify(rows));
  });
});

router.post("/addTeam", (req, res) => {
  addTeam([req.body.name, req.body.groupLetter], err => {
    if (!err) {
      res.status(200);
      res.contentType("text/html");
      res.send("<html><head></head><body><h3>Dodano drużynę</h3></body></html>");
    }
    else {
      res.status(200);
      res.contentType("text/html");
      res.send("<html><head></head><body><h3>Wystąpił błąd</h3></body></html>");
    }
  });
});

router.post("/addBet", (req, res) => {
  addBet([req.user.userID, req.body.fixture, req.body.result], err => {
    if (!err) {
      res.status(200);
      res.contentType("text/html");
      res.send("<html><head></head><body><h3>Dodano zakład</h3></body></html>");
    } else {
      res.status(200);
      res.contentType("text/html");
      res.send("<html><head></head><body><h3>Nie można dodać zakładu</h3></body></html>");
    }
  });
});

module.exports = router;
