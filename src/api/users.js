var sqlite3 = require("sqlite3").verbose();

var executeQuery = require("../database/executeQuery").executeQuery;

exports.fetchUsers = apiCallback => {
  db = new sqlite3.Database("../zipdb.db", err => {
    if (err) console.log(err);
    var users = executeQuery(db, "selects/getUsers.sql");
    users.then(rows => {
      apiCallback(rows);
    });
  });
};
