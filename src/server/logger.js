exports.logger = (req, res, next) => {
  console.log(new Date().toLocaleString() + " " + req.method + " " + req.url + " from " + req.ip);
  next();
};
