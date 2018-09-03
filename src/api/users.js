var executeQuery = require("../database/executeQuery").executeQuery;

exports.fetchUsers = apiCallback => {
  executeQuery("selects/getUsers.sql")
    .then(rows => {
      apiCallback(false, rows);
    })
    .catch(err => {
      apiCallback(true, err);
    });
};

exports.getUserTable = apiCallback => {
  executeQuery("selects/getUsersID.sql").then(rows => {
    executeQuery("selects/getUCLwinner.sql").then(winner => {
      if (!rows) return apiCallback(false, []);
      if (!Array.isArray(rows)) rows = [rows];
      var promises = rows.map(element =>
        calculatePointsForUser(element.userID, element.login, element.UCLwinner, winner)
      );
      Promise.all(promises).then(pts => apiCallback(false, pts));
    });
  });
};

const calculatePointsForUser = (id, login, UCLwinner, winner) => {
  return new Promise(resolve => {
    executeQuery("selects/getBetsByUser.sql", id).then(bets => {
      var totalNumberOfPoints = 0;
      if (!bets) resolve({id, login, pts: 0});
      if (!Array.isArray(bets)) bets = [bets];
      bets.forEach(element => {
        if (!element) return;
        if (!element.final_score) return;
        var result = element.final_score.split(":");
        var bet = element.bet.split(":");
        totalNumberOfPoints += calculatePointsFromBet(bet, result);
      });
      if (!winner) resolve({id, login, pts: totalNumberOfPoints});
      else {
        if (UCLwinner == winner.value) totalNumberOfPoints += 10;
        resolve({id, login, pts: totalNumberOfPoints});
      }
    });
  });
};

const calculatePointsFromBet = (bet, result) => {
  var betResult = setResult(bet[0], bet[1]);
  var fixtureResult = setResult(result[0], result[1]);
  if (betResult.result !== fixtureResult.result) return 0; //result is different from bet
  if (bet[0] === result[0] && bet[1] === result[1]) return 3;
  else return 1;
};

const setResult = (home, away) => {
  if (home == away)
    return {
      result: "draw"
    };
  if (home > away)
    return {
      result: "home"
    };
  if (home < away)
    return {
      result: "away"
    };
};
