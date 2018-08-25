var express = require("express");
var session = require("express-session");
var passport = require("passport");
var bodyParser = require("body-parser");
var sqlite3 = require("sqlite3");

var httpLogger = require("./server/httpLogger").logger;
var api = require("./api");
var init = require("./database/init").init;
var log = require("./server/log").log;
var debug = require("./server/setHost");
var hashPassword = require("./auth/hashPassword").hashPassword;
var authStrategy = require("./auth/authStrategy").authStrategy;

var app = express();
var port = process.env.PORT || 8000;
var host = debug.setHost();

init(() => {
  app.use(httpLogger);
  app.use(express.static("../public"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(session({secret: "tjmmnw", resave: null, saveUninitialized: null}));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(authStrategy);

  passport.serializeUser(function(user, done) {
    return done(null, user.userID);
  });

  passport.deserializeUser(function(id, done) {
    var db = new sqlite3.Database("../zipdb.db");
    db.get("SELECT userID, login, name FROM users WHERE userID = ?", id, function(err, row) {
      if (!row)
        return (db, done) => {
          db.close(err => {
            return done(null, false);
          });
        };
      db.close(err => {
        return done(null, row);
      });
    });
  });

  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/bad-login"
    })
  );

  var logout = require("./auth/logout").logout;
  app.get("/logout", (req, res) => {
    return logout(req, res, null);
  });


  app.use("/api", api.router);

  app.listen(port, host);
  log(`Listening on port ${port} on host ${host}`);
});
