var sqlite3 = require("sqlite3").verbose();

var executeQuery = require("./executeQuery").executeQuery;

exports.init = () => {
  db = new sqlite3.Database("../zipdb.db", err => {
    if (err) console.log(err);

    var users = executeQuery(db, "init/createTableUsers.sql");
    var fixtures = executeQuery(db, "init/createTableFixtures.sql");
    var teams = executeQuery(db, "init/createTableTeams.sql");
    var bets = executeQuery(db, "init/createTableBets.sql");

    Promise.all([users, fixtures, teams, bets]).then(result => {
      db.close(err => {
        if (err) throw err;
      });
      console.log(new Date().toLocaleString() + " Database initialized successfully");
    });
  });
};
