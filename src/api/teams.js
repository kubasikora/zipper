var executeQuery = require("../database/executeQuery").executeQuery;

exports.fetchTeamsOrderedByGroup = apiCallback => {
  executeQuery("selects/getTeamsOrderedByGroup.sql")
    .then(rows => {
      apiCallback(false, rows);
    })
    .catch(err => {
      apiCallback(true, err);
    })
};

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
