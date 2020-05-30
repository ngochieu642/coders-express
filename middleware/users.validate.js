db = require('../db');

module.exports.postCreate = (req, res, next) => {
    let {name, email, password} = req.body;

    let errs = [];

    // Validate Input existeant
    if (!name) {
        errs.push("Name is required.")
    }

    if (!email) {
        errs.push("Email is required")
    }

    if (!password) {
        errs.push("Password is require")
    }

    // Validate username
    if (!!name && name.length > 30) {
        errs.push("User Name maximum 30 characters");
    }

    // Validate


    if (errs.length > 0) {
        res.render("admin-user", {
            errors: errs,
            values: req.body,
        });
        return;
    }

    next();
};
