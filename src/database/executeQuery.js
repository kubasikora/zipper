var fs = require("fs");
var log = require("../server/log").log;
var dir = "./database/sql/";

exports.executeQuery = (database, filename, params) => {
  return new Promise((resolve, reject) => {
    fs.readFile(dir + filename, (err, sql) => {
      if (err) throw err;
      log("Running SQL query " + filename);
      if (params) {
        database.get(sql.toString(), params, (err, rows) => {
          if (err) throw err;
          resolve(rows);
        });
      } else {
        database.get(sql.toString(), (err, rows) => {
          if (err) throw err;
          resolve(rows);
        });
      }
    });
  });
};
