module.exports = function (req, res, next) {
  if (req.session && req.session.userLogged) {
    return res.redirect('/users/profile');
  }
  next();
};
