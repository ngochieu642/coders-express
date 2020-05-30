const db = require("../db");
const shortId = require("shortid");
const debugService = require("debug-level").log("auth");
const md5 = require("md5");

module.exports = {
  getLogin: function (req, res) {
    res.render("auth/login");
  },

  postLogin: function (req, res, next) {
    let { email, password } = req.body;
    let user = db.get("users").find({ email: email }).value();

    if (!user) {
      debugService.warn(`User with email ${email} does not exist`);
      res.render("auth/login", {
        errors: ["User does not exist"],
        values: req.body,
      });
      return;
    }

    // Hash md5
    let md5Hash = md5(password);
    if (user.password !== md5Hash) {
      res.render("auth/login", {
        errors: ["Wrong password"],
        values: req.body,
      });
      return;
    }

    debugService.info(`UserId ${user.id} logged in`);
    res.cookie("userId", user.id);

    if (!user || !user.isAdmin) {
      debugService.info(`Not Amin User`);
      res.redirect("/transactions");
      return;
    } else {
      res.redirect("/users/create");
      return;
    }
  },
};
