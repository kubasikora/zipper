var sqlite3 = require("sqlite3");
var executeQuery = require("../database/executeQuery").executeQuery;

exports.deserializeUser = (id, done) => {
    executeQuery("selects/getUserByUserID.sql", id)
    .then(row => {
      if (!row) return done(null, false);
      else return done(null, row);
    });
  }