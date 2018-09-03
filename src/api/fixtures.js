var executeQuery = require("../database/executeQuery").executeQuery;

exports.getAllFixtures = apiCallback => {
    executeQuery("selects/getAllFixtures.sql")
    .then(rows =>{
        apiCallback(false, rows)
    })
    .catch(err => {
        apiCallback(true, err);
    })
}

exports.getAvailableFixtures = apiCallback => {
    executeQuery("selects/getAvailableFixtures.sql", Date.now())
    .then(rows =>{
        apiCallback(false, rows)
    })
    .catch(err => {
        apiCallback(true, err);
    })
}