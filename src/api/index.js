var express = require("express");
var router = express.Router();

var users = require("./users");
var teams = require("./teams");
var bets = require("./bets");
var fixtures = require("./fixtures");
const expressJwt = require('express-jwt');  
var admin = require("./admin");

/***********************
 * 
 * Obsługa błędów bazy!!!!!!
 * 
 */

var sendResponse = (res, data) => {
  res.status(200);
  res.contentType("application/json");
  res.send(JSON.stringify(data));
} 

router.use("/admin", admin);

const authenticate = expressJwt({secret : 'server secret'});
/*
router.use((req, res, next) => {
  if (req.user || process.argv[2] === "-d") next();
  else {
    res.status(200);
    res.contentType("application/json");
    res.send("Proszę się zalogować!");
  }
});
*/
router.use(authenticate);
router.get("/users", (req, res) => {
  users.fetchUsers((err,rows) => {
    sendResponse(res, rows);
  });
});

router.get("/teams", (req, res) => {
  teams.fetchTeamsOrderedByGroup((err,rows) => {
    sendResponse(res, rows);
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

router.get("/fixtures/all", (req, res) => {
  fixtures.getAllFixtures((err, response) => {
    sendResponse(res, response);
  })
})

router.get("/fixtures/available", (req, res) => {
  fixtures.getAvailableFixtures((err, response) => {
    sendResponse(res, response);
  })
})

router.get("/userTable", (req, res) => {
  users.getUserTable((err, response) => {
    sendResponse(res, response);
  })
})

module.exports = router;
