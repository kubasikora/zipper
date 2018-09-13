var express = require("express");
var router = express.Router();

var users = require("./users");
var teams = require("./teams");
var bets = require("./bets");
var fixtures = require("./fixtures");

/***********************
 *
 * Obsługa błędów bazy!!!!!!
 *
 */

var sendResponse = (res, data) => {
  res.status(200);
  res.contentType("application/json");
  res.send(JSON.stringify(data));
};


router.get("/team", (req, res) => {
   sendResponse(res, "git");
});
router.post("/team", (req, res) => {
  teams.addTeam([req.body.name, req.body.groupLetter], err => {
    var text = err ? "Wystąpił błąd" : "Dodano drużynę";
    var html = `<html><head></head><body><h3>${text}</h3></body></html>`;
    sendResponse(res, html);
  });
});

router.post("/fixture", (req, res) => {
  fixtures.addFixture([req.body.home, req.body.away, req.body.date], err => {
    var text = err ? "Wystąpił błąd" : "Dodano spotkanie";
    var html = `<html><head></head><body><h3>${text}</h3></body></html>`;
    sendResponse(res, html);
  });
});

router.delete("/fixture", (req, res) => {
  fixtures.deleteFixture(req.query.fixtureID, err => {
    var text = err ? "Wystąpił błąd" : "Usunięto spotkanie";
    var html = `<html><head></head><body><h3>${text}</h3></body></html>`;
    sendResponse(res, html);
  });
});

router.put("/fixture/result", (req, res) => {
  fixtures.setResult([req.body.result, req.body.fixtureID], err => {
    var text = err ? "Wystąpił błąd" : "Dodano rezultat";
    var html = `<html><head></head><body><h3>${text}</h3></body></html>`;
    sendResponse(res, html);
  })
});

router.put("/team", (req, res) => {
  teams.flipAvailability(req.body.teamID, err => {
    var text = err ? "Wystąpił błąd" : "Zmieniono dostępnosc";
    var html = `<html><head></head><body><h3>${text}</h3></body></html>`;
    sendResponse(res, html);
  })
});

module.exports = router;
