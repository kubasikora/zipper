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