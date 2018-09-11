var sqlite3 = require("sqlite3").verbose();
var executeQuery = require("./executeQuery").executeQuery;
var log = require("../server/log").log;
var genRandomString = require("../auth/register").genRandomString;
var hashPassword = require("../auth/hashPassword").hashPassword;

exports.init = callback => {
  log("Started database initialization");

  var users = executeQuery("init/createTableUsers.sql");
  var fixtures = executeQuery("init/createTableFixtures.sql");
  var teams = executeQuery("init/createTableTeams.sql");
  var bets = executeQuery("init/createTableBets.sql");
  var globals = executeQuery("init/createTableGlobals.sql");

  try{
  Promise.all([users, fixtures, teams, bets, globals]).then(result => {
    executeQuery("selects/getUserByLogin.sql", "admin").then(users => {
      if (!users) {
        var salt = genRandomString();
        var hash = hashPassword("admin", salt);
        var params = ["admin", "admin", hash, salt, null];
        executeQuery("inserts/insertUser.sql", params).then(() => {
          log("Admin account created");
        });
      }
      log("Database initialized successfully");
      callback();
    });
  });
  }
  catch(err){
    callback();
  } 
};
