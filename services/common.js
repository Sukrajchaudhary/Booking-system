const passport = require("passport");

// Middleware for authentication
exports.isAuth = () => {
  return passport.authenticate('jwt');
};

exports.sanitizer = (user) => {
  return { id: user.id, role: user.role, username: user.username };
};

exports.cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) {
      token = req.cookies['jwt'];
  }
  return token;
};