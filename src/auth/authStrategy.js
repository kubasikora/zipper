var LocalStrategy = require("passport-local").Strategy;
var hashPassword = require("./hashPassword").hashPassword;
var sqlite3 = require("sqlite3");

exports.authStrategy = new LocalStrategy(function(username, password, done) {
  var db = new sqlite3.Database("../zipdb.db");
  db.get("SELECT salt FROM users WHERE login = ?", [username], function(err, row) {
    if (!row) return closeOnFailure(db, done);
    
    var hash = hashPassword(password, row.salt);
    
    db.get(
      "SELECT login, userID FROM users WHERE login = ? AND password = ?",
      [username, hash],
      function(err, row) {
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
