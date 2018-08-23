var express = require("express");
var logger = require("./server/logger.js").logger;
var api = require("./api");

var init = require("./database/init");
var app = express();

init.init();
app.use(logger);
app.use(express.static("../public"));

app.get("/api/users", (req, res) => {
  api.fetchUsers(rows => {
    res.status(200);
    res.contentType("application/json");
    res.send(rows);
  });
});

app.listen(8080, "127.0.0.1");
console.log("Listening on port 8080");
