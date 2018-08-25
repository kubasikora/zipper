var fs = require("fs");
var sqlite3 = require("sqlite3");

var log = require("../server/log").log;
var dir = "./database/sql/";

exports.executeQuery = (filename, params) => {
  return new Promise((resolve, reject) => {
    var db = new sqlite3.Database("../zipdb.db");
    fs.readFile(dir + filename, (err, sql) => {
      if (err) throw err;
      log("Running SQL query " + filename);
      if (params) {
        db.all(sql.toString(), params, (err, rows) => {
          if (err) throw err;
          db.close(err => {
            if(err) throw err;
            if(rows.length ===  1) rows = rows[0];
            resolve(rows);
          });
        });
      } else {
        db.all(sql.toString(), (err, rows) => {
          if (err) throw err;
          db.close(err => {
            if(err) throw err;
            if(rows.length ===  1) rows = rows[0];
            resolve(rows);
          });
        });
      }
    });
  });
};
