exports.logout = function (req, res, next) {
    req.logout();
    req.session.destroy(function (err) {
      if (err) { return next(err); }
      return res.send({ authenticated: req.isAuthenticated() });
    });
  };