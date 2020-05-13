const express = require("express");
const router = express.Router();
const controller = require("../controller/users");
const userValidate = require("../middleware/users.validate");

router.get("/create", controller.getCreate);
router.get("/:id", controller.getItemById);
router.get("/", controller.root);
router.get("/:id/delete", controller.getDeleteById);
router.post("/:id/update", controller.postUpdateById);
router.post("/create", userValidate.postCreate, controller.postCreate);

module.exports = router;
