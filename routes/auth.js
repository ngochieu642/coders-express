const express = require("express");
const router = express.Router();
const controller = require("../controller/auth");

router.get("/login", controller.getLogin);
router.post("/login", controller.postLogin);

module.exports = router;
