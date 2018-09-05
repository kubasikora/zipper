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
