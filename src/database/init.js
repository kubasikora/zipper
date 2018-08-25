var sqlite3 = require("sqlite3").verbose();
var executeQuery = require("./executeQuery").executeQuery;
var log = require("../server/log").log;

exports.init = callback => {
  db = new sqlite3.Database("../zipdb.db", err => {
    if (err) console.log(err);

    log("Started database initialization");

    var users = executeQuery(db, "init/createTableUsers.sql", null);
    var fixtures = executeQuery(db, "init/createTableFixtures.sql", null);
    var teams = executeQuery(db, "init/createTableTeams.sql", null);
    var bets = executeQuery(db, "init/createTableBets.sql", null);

    Promise.all([users, fixtures, teams, bets]).then(result => {
      db.close(err => {
        if (err) throw err;
      });
      log("Database initialized successfully");
      callback();
    });
  });
};
