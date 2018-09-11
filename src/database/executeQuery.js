var fs = require("fs");
var sqlite3 = require("sqlite3");

var log = require("../server/log").log;
var dir = "./src/database/sql/";

var prepareResult = rows => {
  if (rows.length === 1) return rows[0];
  if (rows.length === 0) return undefined;
  return rows;
};

var returnResult = (err, rows, db, resolve) => {
  if (err) throw err;
  db.close(err => {
    if (err) throw err;
    return resolve(prepareResult(rows));
  });
};

exports.executeQuery = (filename, params) => {
  return new Promise((resolve, reject) => {
    try {
      var db = new sqlite3.Database("./zipdb.db");
      fs.readFile(dir + filename, (err, sql) => {
        if (err) throw err;
        log("Running SQL query " + filename);
        if (params)
          db.all(sql.toString(), params, (err, rows) => returnResult(err, rows, db, resolve));
        else db.all(sql.toString(), (err, rows) => returnResult(err, rows, db, resolve));
      });
    } catch (err) {
      db.close();
      reject(err);
    }
  });
};


