var express = require("express");
var router = express.Router();

var fetchUsers = require("./users").fetchUsers;
var addTeam = require("./addTeam").addTeam;

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

router.post("/addTeam", (req, res) => { 
  addTeam([req.body.name, req.body.groupLetter], () => {
    res.status(200);
    res.contentType("text/html");
    res.send("<html><head></head><body><h3>Dodano drużynę</h3></body></html>");
  });
})

module.exports = router;
