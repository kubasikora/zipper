var sqlite3 = require("sqlite3").verbose();


var sql = require("./executeQuery");


exports.init = () => {
  db = new sqlite3.Database("../zipdb.db", err => {
    if (err) console.log(err);

    var users = sql.executeQuery("init/createTableUsers.sql");
    var fixtures = sql.executeQuery("init/createTableFixtures.sql");
    var teams = sql.executeQuery("init/createTableTeams.sql");
    var bets = sql.executeQuery("init/createTableBets.sql");

    Promise.all([users, fixtures, teams, bets]).then(result => {
      db.close(err => {
        if (err) throw err;
      });
      console.log((new Date()).toLocaleString() + " Database initialized successfully");
    });
  });
};
