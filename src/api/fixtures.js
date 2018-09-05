var executeQuery = require("../database/executeQuery").executeQuery;

exports.getAllFixtures = apiCallback => {
  executeQuery("selects/getAllFixtures.sql")
    .then(rows => {
      apiCallback(false, rows);
    })
    .catch(err => {
      apiCallback(true, err);
    });
};

exports.getAvailableFixtures = apiCallback => {
  executeQuery("selects/getAvailableFixtures.sql", Date.now())
    .then(rows => {
      apiCallback(false, rows);
    })
    .catch(err => {
      apiCallback(true, err);
    });
};

exports.addFixture = (params, apiCallback) => {
  executeQuery("inserts/insertFixture.sql", params)
    .then(() => apiCallback(false))
    .catch(err => apiCallback(true, err));
};

exports.deleteFixture = (params, apiCallback) => {
  executeQuery("deletes/deleteFixture.sql", params)
    .then(() => apiCallback(false))
    .catch(err => apiCallback(true, err));
};

exports.setResult = (params, apiCallback) => {
  executeQuery("updates/updateFixture.sql", params)
    .then(() => apiCallback(false))
    .catch(err => apiCallback(true, err));
};


