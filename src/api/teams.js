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

exports.flipAvailability = (params, apiCallback) => {
  executeQuery("selects/getTeamById.sql", params).then(response => {
    var availability = response.isPlaying === "TAK" ? "NIE" : "TAK";
    executeQuery("updates/updateTeam.sql", [availability, params])
      .then(() => apiCallback(false))
      .catch(err => apiCallback(true, err));
  });
};

exports.addTeam = (params, apiCallback) => {
  executeQuery("selects/getTeamsByGroup.sql", params[1]).then(response => {
    if (!response || !Array.isArray(response) || response.length < 4) {
      executeQuery("inserts/insertTeam.sql", params).then(() => {
        apiCallback(false);
      })
      .catch(err => apiCallback(true));
    } else apiCallback(true);
  })
}
