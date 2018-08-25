var LocalStrategy = require("passport-local").Strategy;
var hashPassword = require("./hashPassword").hashPassword;
var sqlite3 = require("sqlite3");
var executeQuery = require("../database/executeQuery").executeQuery;

exports.authStrategy = new LocalStrategy(function(username, password, done) {
  var db = new sqlite3.Database("../zipdb.db");
  executeQuery(db, "selects/getSalt.sql", [username])
  .then(row => {
    if (!row) return closeOnFailure(db, done);
    var hash = hashPassword(password, row.salt);
      executeQuery(db, "selects/getUserInfoByCredentials.sql", [username, hash])
      .then(row => {
        if (!row) return closeOnFailure(db, done);
        db.close(err => {
            return done(null, row);
        });
      }
    );
  });
});

var closeOnFailure = (db, done) => {
    db.close(err => {
        return done(null, false);
    });
};
