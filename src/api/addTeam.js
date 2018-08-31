var executeQuery = require("../database/executeQuery").executeQuery;

exports.addTeam = (params, apiCallback) => {
  executeQuery("selects/getTeamsByGroup.sql", params[1]).then(response => {
    if (!response || !Array.isArray(response) || response.length < 4) {
      executeQuery("inserts/insertTeam.sql", params).then(() => {
        apiCallback(false);
      })
      .catch(err => apiCallback(true));
    } else apiCallback(true);
  });
};
