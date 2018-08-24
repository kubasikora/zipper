var express = require("express");
var session = require("express-session");
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require('passport-local').Strategy;

var httpLogger = require("./server/httpLogger").logger;
var api = require("./api");
var auth = require("./auth");
var init = require("./database/init").init;
var log = require("./server/log").log;
var debug = require("./server/setHost");

var app = express();
var port = process.env.PORT || 8000;
var host = debug.setHost();

init(() => {
  app.use(httpLogger);
  app.use(express.static("../public"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(session({ secret: 'tjmmnw', resave: null, saveUninitialized: null }));
  app.use(passport.initialize());
  app.use(passport.session());
  var crypto = require("crypto");
  var sqlite3 = require("sqlite3");

  var db = new sqlite3.Database("../zipdb.db");

  function hashPassword(password, salt) {
    var hash = crypto.createHash("sha256");
    hash.update(password);
    hash.update(salt);
    return hash.digest("hex");
  }

  passport.use(
    new LocalStrategy(function(username, password, done) {
      db.get("SELECT salt FROM users WHERE login = ?", [username], function(err, row) {
        if (!row) return done(null, false);
        var hash = hashPassword(password, row.salt);
        db.get(
          "SELECT login, userID FROM users WHERE login = ? AND password = ?",
          [username, hash],
          function(err, row) {
            if (!row) return done(null, false);
            return done(null, row);
          }
        );
      });
    })
  );

  passport.serializeUser(function(user, done) {
    return done(null, user.userID);
  });

  passport.deserializeUser(function(id, done) {
    db.get("SELECT userID, login, name FROM users WHERE userID = ?", id, function(err, row) {
      if (!row) return done(null, false);
      return done(null, row);
    });
  });

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/bad-login' 
    })
  );

  app.use("/api", api.router);

  app.listen(port, host);
  log(`Listening on port ${port} on host ${host}`);
});
