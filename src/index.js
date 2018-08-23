var express = require("express");

var logger = require("./server/logger.js").logger;
var api = require("./api");
var init = require("./database/init").init;

var app = express();
var port = process.env.PORT || 8000;

init(() => {
  app.use(logger);
  app.use(express.static("../public"));
  app.use("/api", api.router);

  app.listen(port, "127.0.0.1");
  console.log(`Listening on port ${port}`);
});
