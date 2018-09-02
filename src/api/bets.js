var executeQuery = require("../database/executeQuery").executeQuery;

exports.addBet = (params, apiCallback) => {
  executeQuery("selects/getFixtureById.sql", params[1]).then(fixture => {
    if (!fixture) return apiCallback(true);
    if (fixture.date < new Date().getTime()) {
      return apiCallback(true);
    }
    executeQuery("selects/getBetByFixtureAndUserID.sql", [params[0], params[1]]).then(bet => {
      if(bet) executeQuery("updates/updateBet.sql", [params[2], params[0], params[1]]).then(() => {
        apiCallback(false);
      })
      else executeQuery("inserts/insertBet.sql", params).then(() => {
        apiCallback(false);
      });
    });
  });
};

exports.getBetHistory = (userID, apiCallback) => {
  executeQuery("selects/getBetsByUser.sql", userID).then(bets => {
    return apiCallback(false, bets);
  }).catch(err => {
    return apiCallback(true, err);
  })
}