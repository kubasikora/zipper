var fs = require("fs");
var dir = "./database/sql/";

exports.executeQuery = filename => {
    return new Promise((resolve, reject) => {
      fs.readFile(dir + filename, (err, sql) => {
        if (err) throw err;
        console.log((new Date()).toLocaleString() + " Running SQL query " + filename);
        db.all(sql.toString(), (err, rows) => {
          if (err) throw err;
          resolve();
        });
      });
    });
  };