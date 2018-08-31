var executeQuery = require("../database/executeQuery").executeQuery;

exports.fetchTeamsOrderedByGroup = apiCallback => {
    executeQuery("selects/getTeamsOrderedByGroup.sql")
    .then(rows => {
      apiCallback(rows);
  });
};
