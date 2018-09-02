var express = require("express");
var router = express.Router();

var users = require("./users");
var teams = require("./teams");
var bets = require("./bets");

var sendResponse = (res, data) => {
  res.status(200);
  res.contentType("application/json");
  res.send(JSON.stringify(data));
} 

router.use((req, res, next) => {
  if (req.user) next();
  else {
    res.status(200);
    res.contentType("application/json");
    res.send("Proszę się zalogować!");
  }
});

router.get("/users", (req, res) => {
  users.fetchUsers(rows => {
    sendResponse(res, rows);
  });
});

router.get("/teams", (req, res) => {
  teams.fetchTeamsOrderedByGroup(rows => {
    sendResponse(res, rows);
  });
});

router.post("/addTeam", (req, res) => {
  teams.addTeam([req.body.name, req.body.groupLetter], err => {
    var text = err ? "Wystąpił błąd" : "Dodano drużynę";
    var html = `<html><head></head><body><h3>${text}</h3></body></html>`
    sendResponse(res, html);
  });
});

router.post("/addBet", (req, res) => {
  bets.addBet([req.user.userID, req.body.fixture, req.body.result], err => {
    var text = err ? "Wystąpił błąd" : "Dodano zakład";
    var html = `<html><head></head><body><h3>${text}</h3></body></html>`
    sendResponse(res, html);
  });
});

router.get("/betHistory", (req, res) => {
  bets.getBetHistory(req.user.userID, (err, response) => {
    sendResponse(res, response);
  });
})

module.exports = router;
