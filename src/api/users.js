var executeQuery = require("../database/executeQuery").executeQuery;

exports.fetchUsers = apiCallback => {
    executeQuery("selects/getUsers.sql")
    .then(rows => {
      apiCallback(rows);
  });
};
