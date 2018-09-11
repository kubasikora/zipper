var express = require("express");
var session = require("express-session");
var passport = require("passport");
var bodyParser = require("body-parser");
var sqlite3 = require("sqlite3");
var cors = require("cors");

var httpLogger = require("./server/httpLogger").logger;
var api = require("./api");
var init = require("./database/init").init;
var log = require("./server/log").log;
var debug = require("./server/setHost");
var hashPassword = require("./auth/hashPassword").hashPassword;
var authStrategy = require("./auth/authStrategy").authStrategy;
var deserializeUser = require("./auth/deserialize").deserializeUser;
var logRouter = require("./auth/logRouter");
var teams = require("./api/teams");

var app = express();
var port = process.env.PORT || 8000;
var host = debug.setHost();

init(() => {
  app.use(cors());
  app.use(httpLogger);
  app.use(express.static("./public"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(session({secret: "tjmmnw", resave: null, saveUninitialized: null}));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(authStrategy);

  passport.serializeUser(function(user, done) {
    return done(null, user.userID);
  });

  passport.deserializeUser((id, done) => deserializeUser(id, done));

  app.use("/", logRouter);
  app.use("/api", api);

  app.get("/isLogged", (req, res) => {
    res.status(200);
    res.contentType("application/json");
    if (!!req.user)
      res.send(
        JSON.stringify({
          isAuthenticated: `${!!req.user}`,
          login: req.user
        })
      );
    else
      res.send(
        JSON.stringify({
          isAuthenticated: false
        })
      );
  });

  app.get("/teams", (req, res) => {
    teams.fetchTeamsOrderedByGroup((err, rows) => {
      res.status(200);
      res.contentType("application/json");
      res.send(rows);
    });
  });

  app.listen(port);
  log(`Listening on port ${port}`)
});
