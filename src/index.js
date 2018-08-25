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
var deserializeUser = require("./auth/deserialize").deserializeUser;
var logRouter = require("./auth/logRouter");

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

  passport.deserializeUser((id,done) => deserializeUser(id, done));

  app.use("/", logRouter);
  app.use("/api", api);

  app.listen(port, host);
  log(`Listening on port ${port} on host ${host}`);
});
