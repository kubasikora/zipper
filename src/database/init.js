var sqlite3 = require("sqlite3").verbose();
var executeQuery = require("./executeQuery").executeQuery;
var log = require("../server/log").log;
var genRandomString = require("../auth/register").genRandomString;
var hashPassword = require("../auth/hashPassword").hashPassword;

exports.init = callback => {
  log("Started database initialization");
  executeQuery("init/createTableUsers.sql").then(resp => {
    executeQuery("init/createTableFixtures.sql").then(resp => {
      executeQuery("init/createTableTeams.sql").then(resp => {
        executeQuery("init/createTableBets.sql").then(resp => {
          executeQuery("init/createTableGlobals.sql").then(resp => {
            executeQuery("selects/getUserByLogin.sql", "admin").then(users => {
              if (!users) {
                var salt = genRandomString();
                var hash = hashPassword("admin", salt);
                var params = ["admin", "admin", hash, salt, null];
                executeQuery("inserts/insertUser.sql", params).then(() => {
                  log("Admin account created");
                });
              }
              log("Database initialized successfully");
              callback();
            });
          });
        });
      });
    });
  });
};
