var sqlite3 = require("sqlite3");
var crypto = require("crypto");

var executeQuery = require("../database/executeQuery").executeQuery;
var hashPassword = require("./hashPassword").hashPassword;
var genRandomString = require("./register").genRandomString;

exports.changePassword = (req, res) => {
  executeQuery("selects/getUserByLogin.sql", req.body.login)
    .then(response => {
      if (response) throw new Exception("user already exists");
      var salt = genRandomString();
      var hash = hashPassword(req.body.password, salt);
      var params = [hash, salt, req.user.userID];
      executeQuery("updates/updateUser.sql", params).then(() => {
        res.status(200);
        res.contentType("text/html");
        req.logout();
        req.session.destroy();
        res.send("<html><head></head><body><h1>Zmieniono hasło</h1></body></html>");
      });
    })
    .catch(err => {
        console.log(err);
      res.status(200);
      res.contentType("text/html");
      res.send("<html><head></head><body><h1>Wystąpił błąd</h1></body></html>");
    });
};

exports.genRandomString = genRandomString;
