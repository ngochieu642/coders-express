const db = require("../db");

module.exports = {
  requireAuth: async function (req, res, next) {
    if (!req.cookies.userId) {
      res.redirect("auth/login");
      return;
    }

    let user = await db.get("users").find({ id: req.cookies.userId }).value();

    if (!user) {
      res.redirect("auth/login");
      return;
    }

    next();
  },
};
