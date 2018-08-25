var sqlite3 = require("sqlite3").verbose();

var executeQuery = require("../database/executeQuery").executeQuery;

exports.fetchUsers = apiCallback => {
    executeQuery("selects/getUsers.sql")
    .then(rows => {
      apiCallback(rows);
  });
};
