const db = require("../db");

module.exports = {
  requireAuth: async function (req, res, next) {
    if (!req.signedCookies.userId) {
      res.redirect("auth/login");
      return next();
    }

    let user = await db.get("users").find({ id: req.signedCookies.userId }).value();

    if (!user) {
      res.redirect("auth/login");
      return next();
    }

    res.locals.user = user

    return next();
  },
};
