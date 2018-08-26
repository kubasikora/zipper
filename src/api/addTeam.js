var executeQuery = require("../database/executeQuery").executeQuery;

exports.addTeam = (params, apiCallback) => {
    executeQuery("inserts/insertTeam.sql", params)
    .then(() => {
      apiCallback();
  });
};
