var fs = require("fs");
var dir = "./database/sql/";

exports.executeQuery = (database, filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(dir + filename, (err, sql) => {
      if (err) throw err;
      console.log(new Date().toLocaleString() + " Running SQL query " + filename);
      database.all(sql.toString(), (err, rows) => {
        if (err) throw err;
        resolve(rows);
      });
    });
  });
};
