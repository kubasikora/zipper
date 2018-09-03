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
} 

router.use((req, res, next) => {
  if (req.user.userID == 1 && req.user.login === "admin") next();
  else {
    res.status(200);
    res.contentType("application/json");
    res.send("Wstęp tylko dla admina!");
  }
});

module.exports = router;