var sqlite3 = require("sqlite3").verbose();
var executeQuery = require("./executeQuery").executeQuery;
var log = require("../server/log").log;

exports.init = callback => {
    log("Started database initialization");

    var users = executeQuery("init/createTableUsers.sql", null);
    var fixtures = executeQuery("init/createTableFixtures.sql", null);
    var teams = executeQuery("init/createTableTeams.sql", null);
    var bets = executeQuery("init/createTableBets.sql", null);

    Promise.all([users, fixtures, teams, bets]).then(result => {
      log("Database initialized successfully");
      callback();
    });
};
