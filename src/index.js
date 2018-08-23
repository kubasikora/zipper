var express = require("express");

var httpLogger = require("./server/httpLogger").logger;
var api = require("./api");
var init = require("./database/init").init;
var log = require("./server/log").log;
var debug = require("./server/setHost");

var app = express();
var port = process.env.PORT || 8000;
var host = debug.setHost();


init(() => {
  app.use(httpLogger);
  app.use(express.static("../public"));
  app.use("/api", api.router);

  app.listen(port, host);
  log(`Listening on port ${port} on host ${host}`);
});
