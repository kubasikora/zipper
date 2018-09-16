var fs = require("fs");
var sqlite3 = require("sqlite3");
var mysql = require("mysql");

var log = require("../server/log").log;
var dir = "./src/database/sql/";

var prepareResult = rows => {
  if (rows.length === 1) return rows[0];
  if (rows.length === 0) return undefined;
  return rows;
};

var returnResult = (err, rows, db, resolve) => {
  if (err) throw err;
  db.end();
  return resolve(prepareResult(rows));
};

exports.executeQuery = (filename, params) => {
  return new Promise((resolve, reject) => {
    try {
      var db = mysql.createConnection({
        host: "den1.mysql6.gear.host",
        user: "zipdb",
        password: "zipapp!",
        database: "zipdb"
      });
      db.connect(err => {
        if (err) throw err;
        fs.readFile(dir + filename, (err, sql) => {
          if (err) throw err;
          log("Running SQL query " + filename);
          if (params)
            db.query(sql.toString(), params, (err, rows) => returnResult(err, rows, db, resolve));
          else db.query(sql.toString(), (err, rows) => returnResult(err, rows, db, resolve));
        });
      });
    } catch (err) {
      db.end();
      reject(err);
    }
  });
};
