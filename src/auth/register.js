var sqlite3 = require("sqlite3");
var crypto = require("crypto");

var executeQuery = require("../database/executeQuery").executeQuery;
var hashPassword = require("./hashPassword").hashPassword;

exports.register = (req, res) => {
  executeQuery("selects/getUserByLogin.sql", req.body.login)
    .then(response => {
      if (response.length !== 0) throw new Exception("user already exists");
      var salt = genRandomString();
      var hash = hashPassword(req.body.password, salt);
      var params = [req.body.name, req.body.login, hash, salt];
      executeQuery("inserts/insertUser.sql", params).then(() => {
        res.status(200);
        res.contentType("text/html");
        res.send("<html><head></head><body><h1>Stworzono uzytkownika</h1></body></html>");
      });
    })
    .catch(err => {
      res.status(200);
      res.contentType("text/html");
      res.send("<html><head></head><body><h1>Użytkownik już istnieje</h1></body></html>");
    });
};

var genRandomString = () => {
  return crypto.randomBytes(25)
    .toString("hex")
    .slice(0, 50);
};
