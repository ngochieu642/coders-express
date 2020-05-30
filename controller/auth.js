const db = require("../db");
const debugService = require("debug-level").log("auth");
const bcrypt = require("bcrypt");
const userController = require("./users");

module.exports = {
  getLogin: function (req, res) {
    res.render("auth/login");
  },

  postLogin: async function (req, res, next) {
    let { email, password } = req.body;
    const errs = [];

    let user = db.get("users").find({ email: email }).value();

    if (!user) {
      errs.push("User does not exist");
      debugService.warn(`User with email ${email} does not exist`);
      res.render("auth/login", {
        errors: errs,
        values: req.body,
      });
      return;
    }

    // Bcrypt
    try {
      let isCorrectPassword = await bcrypt.compare(password, user.password);
      user = await db.get("users").find({ email: email }).value();

      if (!!user.wrongLoginCount && user.wrongLoginCount > 4) {
        errs.push("To many fail login. Account being locked temporarily");
        res.render("auth/login", {
          errors: errs,
          values: req.body,
        });
        return;
      }

      if (!isCorrectPassword) {
        errs.push("Wrong password");
        console.log(user.id);
        userController.increaseWrongLogin(user.id);

        res.render("auth/login", {
          errors: errs,
          values: req.body,
        });
        return;
      }

      debugService.info(`UserId ${user.id} logged in`);
      res.cookie("userId", user.id);

      if (!user || !user.isAdmin) {
        debugService.info(`Not Amin User`);
        res.redirect("/transactions");
      } else {
        res.redirect("/users/create");
      }
    } catch (err) {
      debugService.error(JSON.stringify(err));
    }
  },
};
