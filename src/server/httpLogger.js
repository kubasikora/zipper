var timestamp = require("./timestamp").timestamp;

exports.logger = (req, res, next) => {
  console.log(timestamp() + req.method + " " + req.url + " from " + req.ip);
  next();
};
