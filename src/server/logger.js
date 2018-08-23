exports.logger = (req, res, next) => {
    console.log(req.method + " " + req.url + " " +  (new Date()).toDateString());
    next();
}