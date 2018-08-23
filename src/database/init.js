var sqlite3 = require("sqlite3").verbose();
exports.init = () => {
  var db = new sqlite3.Database("../zipdb.db", err => {
    if (err) {
      console.log(err);
    }
  });

  db.run(
    `CREATE TABLE IF NOT EXISTS users(
        id INTEGER NOT NULL,
        name VARCHAR,
        login VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        PRIMARY KEY(id)
        )`,
    err => {
      if (err) {
        console.log("Error while initializing users table");
        console.log(err);
      }
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS teams(
        name VARCHAR,
        groupLetter CHAR(1) NOT NULL,
        matchesPlayed INTEGER, 
        wins INTEGER,
        draws INTEGER,
        losses INTEGER,
        goalsScored INTEGER, 
        goalsConceded INTEGER,
        points INTEGER,
        PRIMARY KEY(name)
        )`,
    err => {
      if (err) {
        console.log("Error while initializing teams table");
        console.log(err);
      }
    }
  );

  db.close(err => {
    if (err) {
      console.log("Error while initializing database");
    } else {
      console.log("Initializing finished");
    }
  });
};
