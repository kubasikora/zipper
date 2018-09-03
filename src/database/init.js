var sqlite3 = require("sqlite3").verbose();
var executeQuery = require("./executeQuery").executeQuery;
var log = require("../server/log").log;

exports.init = callback => {
    log("Started database initialization");

    var users = executeQuery("init/createTableUsers.sql");
    var fixtures = executeQuery("init/createTableFixtures.sql");
    var teams = executeQuery("init/createTableTeams.sql");
    var bets = executeQuery("init/createTableBets.sql");
    var globals = executeQuery("init/createTableGlobals.sql");

    Promise.all([users, fixtures, teams, bets, globals]).then(result => {
      log("Database initialized successfully");
      callback();
    });
};
