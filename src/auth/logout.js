exports.logout = function (req, res, next) {
    // Get rid of the session token. Then call `logout`; it does no harm.
    req.logout();
    req.session.destroy(function (err) {
      if (err) { return next(err); }
      // The response should indicate that the user is no longer authenticated.
      return res.send({ authenticated: req.isAuthenticated() });
    });
  };