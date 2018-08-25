var LocalStrategy = require("passport-local").Strategy;
var hashPassword = require("./hashPassword").hashPassword;
var sqlite3 = require("sqlite3");
var executeQuery = require("../database/executeQuery").executeQuery;

exports.authStrategy = new LocalStrategy(function(username, password, done) {
  executeQuery("selects/getSalt.sql", [username])
  .then(row => {
    if (!row) return done(null, false);
    var hash = hashPassword(password, row.salt);
      executeQuery("selects/getUserInfoByCredentials.sql", [username, hash])
      .then(row => {
        if (!row) return done(null, false);
        return done(null, row);
      }
    );
  });
});
