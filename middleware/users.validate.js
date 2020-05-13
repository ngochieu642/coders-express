module.exports.postCreate = (req, res, next) => {
  let { name } = req.body;
  let errs = [];

  if (!!name && name.length > 30) {
    errs.push("User Name maximum 30 characters");
  }

  if (errs.length > 0) {
    res.render("admin-user", {
      errors: errs,
      values: req.body,
    });
    return;
  }

  next();
};
