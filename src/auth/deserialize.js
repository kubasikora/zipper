var sqlite3 = require("sqlite3");
var executeQuery = require("../database/executeQuery").executeQuery;

exports.deserializeUser = (id, done) => {
    var db = new sqlite3.Database("../zipdb.db");
    executeQuery(db, "selects/getUserByUserID.sql", id)
    .then(row => {
      if (!row) db.close(err => {
            return done(null, false);
        });
      else
      db.close(err => {
        return done(null, row);
      });
    });
  }